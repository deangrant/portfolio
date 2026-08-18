import { execFile } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import usernames from "../src/assets/usernames.json" with { type: "json" };
import { assertArticles } from "../src/utils/assertGeneratedPortfolioData.mjs";

const execFileAsync = promisify(execFile);

const FETCH_TIMEOUT_MS = 15_000;
const MAX_ARTICLES = 50;
const WORDS_PER_MINUTE = 200;
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const RSS_ACCEPT = "application/rss+xml, application/xml;q=0.9, */*;q=0.8";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  __dirname,
  "../src/assets/data/substack-articles.generated.json",
);

/**
 * @typedef {{
 *   href: string;
 *   publishedAt: string;
 *   readTime: string;
 *   summary: string;
 *   title: string;
 * }} Article
 */

/**
 * Returns whether a value is a non-null object record.
 * @param {unknown} value Candidate value.
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Returns whether an execFile failure means curl is not installed.
 * @param {unknown} error Candidate error.
 * @returns {boolean}
 */
function isMissingExecutable(error) {
  return isRecord(error) && error.code === "ENOENT";
}

/**
 * Reads a curl failure message from stderr or the error text.
 * @param {unknown} error Candidate error.
 * @returns {string}
 */
function curlErrorDetail(error) {
  if (isRecord(error) && typeof error.stderr === "string") {
    const stderr = error.stderr.trim();

    if (stderr.length > 0) {
      return stderr;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

/**
 * Fetches a URL with curl so Cloudflare TLS fingerprinting is less likely to
 * block GitHub Actions datacenter IPs.
 * @param {string} url Absolute URL to fetch.
 * @returns {Promise<string>}
 */
async function curlGet(url) {
  try {
    const { stdout } = await execFileAsync(
      "curl",
      [
        "-sS",
        "-L",
        "--fail",
        "--max-time",
        String(FETCH_TIMEOUT_MS / 1000),
        "-A",
        BROWSER_USER_AGENT,
        "-H",
        `Accept: ${RSS_ACCEPT}`,
        url,
      ],
      {
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
        timeout: FETCH_TIMEOUT_MS + 1000,
      },
    );

    return stdout;
  } catch (error) {
    if (isMissingExecutable(error)) {
      throw new Error("curl is not available; cannot fetch Substack RSS");
    }

    throw new Error(`Substack RSS request failed (${curlErrorDetail(error)})`);
  }
}

/**
 * Returns whether a path exists and is readable.
 * @param {string} filePath Absolute path to check.
 * @returns {Promise<boolean>}
 */
async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns whether the existing generated articles file has at least one entry.
 * @param {string} filePath Absolute path to the generated JSON file.
 * @returns {Promise<boolean>}
 */
async function hasNonEmptyArticlesFile(filePath) {
  if (!(await pathExists(filePath))) {
    return false;
  }

  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8"));
    return Array.isArray(parsed) && parsed.length > 0;
  } catch {
    return false;
  }
}

/**
 * Formats a Substack post date as `YYYY-MM-DD`.
 * @param {string | undefined} postDate ISO timestamp or RSS pubDate.
 * @returns {string | null}
 */
function toPublishedAt(postDate) {
  if (postDate === undefined || postDate.length === 0) {
    return null;
  }

  const parsed = Date.parse(postDate);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return new Date(parsed).toISOString().slice(0, 10);
}

/**
 * Builds a human-readable reading-time label from word count.
 * @param {number | undefined} wordcount Estimated or reported word count.
 * @returns {string}
 */
function toReadTime(wordcount) {
  const words =
    typeof wordcount === "number" && Number.isFinite(wordcount)
      ? Math.max(0, wordcount)
      : 0;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return `${minutes} min read`;
}

/**
 * Decodes a Substack RSS text node, including CDATA and basic XML entities.
 * @param {string} value Raw element inner XML.
 * @returns {string}
 */
function decodeXmlText(value) {
  const withoutCdata = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");

  return withoutCdata
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&")
    .trim();
}

/**
 * Reads the inner text of the first matching XML tag in a block.
 * @param {string} block RSS item or feed fragment.
 * @param {string} tag Element name, including an optional namespace prefix.
 * @returns {string}
 */
function extractTag(block, tag) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)</${escaped}>`,
    "i",
  );
  const match = block.match(pattern);

  return match === null ? "" : decodeXmlText(match[1]);
}

/**
 * Splits a Substack RSS document into raw `<item>` inner XML blocks.
 * @param {string} rss RSS XML document.
 * @returns {string[]}
 */
function extractRssItems(rss) {
  /** @type {string[]} */
  const items = [];
  const pattern = /<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi;
  let match = pattern.exec(rss);

  while (match !== null) {
    items.push(match[1]);
    match = pattern.exec(rss);
  }

  return items;
}

/**
 * Estimates word count from HTML by stripping tags and collapsing whitespace.
 * @param {string} html RSS `content:encoded` HTML.
 * @returns {number}
 */
function countWordsFromHtml(html) {
  const text = html
    .replace(/<script\b[\s\S]*?<\/script(?:\s[^>]*)?>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style(?:\s[^>]*)?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length === 0) {
    return 0;
  }

  return text.split(" ").length;
}

/**
 * Maps one RSS item into the portfolio Article shape.
 * @param {string} itemXml Inner XML of an `<item>` element.
 * @returns {Article | null}
 */
function mapRssItemToArticle(itemXml) {
  const title = extractTag(itemXml, "title");
  const href = extractTag(itemXml, "link");
  const publishedAt = toPublishedAt(extractTag(itemXml, "pubDate"));
  const summary = extractTag(itemXml, "description");
  const content = extractTag(itemXml, "content:encoded");

  if (title.length === 0 || href.length === 0 || publishedAt === null) {
    return null;
  }

  return {
    href,
    publishedAt,
    readTime: toReadTime(countWordsFromHtml(content)),
    summary: summary.length > 0 ? summary : "No summary provided.",
    title,
  };
}

/**
 * Maps a Substack RSS document into portfolio articles.
 * @param {string} rss RSS XML document.
 * @returns {Article[]}
 */
function toArticlesFromRss(rss) {
  /** @type {Article[]} */
  const articles = [];

  for (const item of extractRssItems(rss)) {
    const article = mapRssItemToArticle(item);

    if (article !== null) {
      articles.push(article);
    }

    if (articles.length >= MAX_ARTICLES) {
      break;
    }
  }

  return articles;
}

/**
 * Fetches newsletter posts from the public Substack RSS feed via curl.
 * @param {string} username Publication subdomain / username.
 * @returns {Promise<Article[]>}
 */
async function fetchArticlesFromRss(username) {
  const rss = await curlGet(`https://${username}.substack.com/feed`);
  const articles = toArticlesFromRss(rss);

  if (articles.length === 0) {
    throw new Error(`Substack RSS feed contained no articles for ${username}`);
  }

  console.log(
    `Fetched ${articles.length} articles for ${username} from Substack RSS`,
  );

  return articles;
}

async function main() {
  const username = process.env.SUBSTACK_USERNAME ?? usernames.substack;
  const articles = assertArticles(await fetchArticlesFromRss(username));

  if (articles.length === 0) {
    throw new Error(`No newsletter articles found for ${username}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(articles, null, 2)}\n`, "utf8");

  console.log(
    `Wrote ${articles.length} articles for ${username} to ${outputPath}`,
  );
}

main().catch(async (error) => {
  const message = error instanceof Error ? error.message : error;

  if (await hasNonEmptyArticlesFile(outputPath)) {
    console.warn(
      `Substack articles fetch failed; keeping existing ${outputPath}`,
    );
    console.warn(message);
    return;
  }

  console.error(message);
  process.exitCode = 1;
});
