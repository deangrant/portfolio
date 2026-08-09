import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertArticles } from "./lib/assert-generated-data.mjs";

const DEFAULT_USERNAME = "deangrant";
const FETCH_TIMEOUT_MS = 15_000;
const MAX_ARTICLES = 50;
const PAGE_SIZE = 50;
const WORDS_PER_MINUTE = 200;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  __dirname,
  "../src/data/substack-articles.generated.json",
);

/**
 * @typedef {{
 *   audience?: string;
 *   canonical_url?: string;
 *   description?: string | null;
 *   post_date?: string;
 *   slug?: string;
 *   subtitle?: string | null;
 *   title?: string;
 *   type?: string;
 *   wordcount?: number;
 * }} SubstackPost
 */

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
 * Builds request headers for the Substack archive API.
 * @returns {HeadersInit}
 */
function createSubstackHeaders() {
  return {
    Accept: "application/json",
    "User-Agent": "portfolio-web-fetch-substack-articles",
  };
}

/**
 * Returns whether a value is a non-null object record.
 * @param {unknown} value Candidate value.
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validates one Substack archive page payload.
 * @param {unknown} data Candidate API JSON body.
 * @param {number} offset Archive page offset for error messages.
 * @returns {SubstackPost[]}
 */
function assertSubstackPosts(data, offset) {
  if (!Array.isArray(data)) {
    throw new Error(
      `Substack archive response at offset ${offset} must be an array`,
    );
  }

  return data.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(
        `Substack archive response at offset ${offset}[${index}] must be an object`,
      );
    }

    return /** @type {SubstackPost} */ (entry);
  });
}

/**
 * Fetches one page of published archive posts for a Substack publication.
 * @param {string} username Publication subdomain / username.
 * @param {number} offset Archive page offset.
 * @returns {Promise<SubstackPost[]>}
 */
async function fetchArchivePage(username, offset) {
  const url = new URL(`https://${username}.substack.com/api/v1/archive`);
  url.searchParams.set("sort", "new");
  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("offset", String(offset));

  const response = await fetch(url, {
    headers: createSubstackHeaders(),
    redirect: "follow",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Substack archive request failed (${response.status} ${response.statusText}): ${body}`,
    );
  }

  return assertSubstackPosts(await response.json(), offset);
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
 * Fetches newsletter posts up to the hard article cap.
 * @param {string} username Publication subdomain / username.
 * @returns {Promise<SubstackPost[]>}
 */
async function fetchSubstackPosts(username) {
  /** @type {SubstackPost[]} */
  const posts = [];
  let offset = 0;

  while (posts.length < MAX_ARTICLES) {
    const page = await fetchArchivePage(username, offset);

    if (page.length === 0) {
      break;
    }

    posts.push(...page);
    offset += page.length;

    if (page.length < PAGE_SIZE) {
      break;
    }
  }

  return posts.slice(0, MAX_ARTICLES);
}

/**
 * Formats a Substack post date as `YYYY-MM-DD`.
 * @param {string | undefined} postDate ISO timestamp from Substack.
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
 * @param {number | undefined} wordcount Substack word count.
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
 * Picks the best available summary string for a post.
 * @param {SubstackPost} post Archive post payload.
 * @returns {string}
 */
function toSummary(post) {
  const subtitle = post.subtitle?.trim() ?? "";

  if (subtitle.length > 0) {
    return subtitle;
  }

  const description = post.description?.trim() ?? "";

  if (description.length > 0) {
    return description;
  }

  return "No summary provided.";
}

/**
 * Maps a Substack archive post into the portfolio Article shape.
 * @param {SubstackPost} post Archive post payload.
 * @returns {Article | null}
 */
function mapSubstackPostToArticle(post) {
  const title = post.title?.trim() ?? "";
  const href = post.canonical_url?.trim() ?? "";
  const publishedAt = toPublishedAt(post.post_date);

  if (title.length === 0 || href.length === 0 || publishedAt === null) {
    return null;
  }

  return {
    href,
    publishedAt,
    readTime: toReadTime(post.wordcount),
    summary: toSummary(post),
    title,
  };
}

/**
 * Filters newsletter posts and maps them for the writing section.
 * @param {SubstackPost[]} posts Raw archive posts.
 * @returns {Article[]}
 */
function toArticles(posts) {
  /** @type {Article[]} */
  const articles = [];

  for (const post of posts) {
    if (post.type !== "newsletter") {
      continue;
    }

    const article = mapSubstackPostToArticle(post);

    if (article !== null) {
      articles.push(article);
    }
  }

  return articles;
}

async function main() {
  const username = process.env.SUBSTACK_USERNAME ?? DEFAULT_USERNAME;
  const posts = await fetchSubstackPosts(username);
  const articles = assertArticles(toArticles(posts));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(articles, null, 2)}\n`, "utf8");

  console.log(
    `Wrote ${articles.length} articles for ${username} to ${outputPath}`,
  );
}

main().catch(async (error) => {
  const message = error instanceof Error ? error.message : error;

  if (await pathExists(outputPath)) {
    console.warn(
      `Substack articles fetch failed; keeping existing ${outputPath}`,
    );
    console.warn(message);
    return;
  }

  console.error(message);
  process.exitCode = 1;
});
