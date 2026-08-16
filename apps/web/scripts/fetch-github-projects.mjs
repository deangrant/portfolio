import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import usernames from "../src/assets/usernames.json" with { type: "json" };
import { assertProjects } from "../src/utils/assertGeneratedPortfolioData.mjs";

const FETCH_TIMEOUT_MS = 15_000;
const MAX_PAGES = 10;
const MAX_PROJECTS = 50;
const PER_PAGE = 100;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  __dirname,
  "../src/assets/data/github-projects.generated.json",
);

/**
 * @typedef {{
 *   archived: boolean;
 *   created_at: string;
 *   description: string | null;
 *   fork: boolean;
 *   html_url: string;
 *   language: string | null;
 *   name: string;
 *   private: boolean;
 *   pushed_at: string;
 *   topics?: string[];
 * }} GithubRepo
 */

/**
 * @typedef {{
 *   createdAt: string;
 *   description: string;
 *   href: string;
 *   languages: string[];
 *   title: string;
 *   topics: string[];
 *   updatedAt: string;
 * }} Project
 */

/**
 * Builds request headers for the GitHub REST API.
 * @returns {HeadersInit}
 */
function createGithubHeaders() {
  /** @type {Record<string, string>} */
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-web-fetch-github-projects",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN;

  if (token !== undefined && token.length > 0) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
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
 * Asserts one GitHub repository payload used by the project mapper.
 * @param {unknown} value Candidate repository payload.
 * @param {number} index Array index for error messages.
 * @returns {GithubRepo}
 */
function assertGithubRepo(value, index) {
  const label = `repos[${index}]`;

  if (!isRecord(value)) {
    throw new Error(`${label} must be an object`);
  }

  for (const field of ["archived", "fork", "private"]) {
    if (typeof value[field] !== "boolean") {
      throw new Error(`${label}.${field} must be a boolean`);
    }
  }

  for (const field of ["created_at", "html_url", "name", "pushed_at"]) {
    if (typeof value[field] !== "string" || value[field].length === 0) {
      throw new Error(`${label}.${field} must be a non-empty string`);
    }
  }

  if (value.description !== null && typeof value.description !== "string") {
    throw new Error(`${label}.description must be a string or null`);
  }

  if (value.topics !== undefined) {
    if (
      !Array.isArray(value.topics) ||
      value.topics.some((topic) => typeof topic !== "string")
    ) {
      throw new Error(
        `${label}.topics must be an array of strings when present`,
      );
    }
  }

  return /** @type {GithubRepo} */ (value);
}

/**
 * Validates the GitHub repositories API payload.
 * @param {unknown} data Candidate API JSON body.
 * @returns {GithubRepo[]}
 */
function assertGithubRepos(data) {
  if (!Array.isArray(data)) {
    throw new Error("GitHub repositories response must be an array");
  }

  return data.map((entry, index) => assertGithubRepo(entry, index));
}

/**
 * Returns whether a repository is eligible for the portfolio carousel.
 * @param {GithubRepo} repo Repository payload from GitHub.
 * @returns {boolean}
 */
function isEligibleRepo(repo) {
  return (
    !repo.fork &&
    !repo.archived &&
    !repo.private &&
    typeof repo.name === "string" &&
    repo.name.length > 0
  );
}

/**
 * Fetches one page of owner repositories for a GitHub user.
 * @param {string} username GitHub login.
 * @param {number} page 1-based page index.
 * @returns {Promise<GithubRepo[]>}
 */
async function fetchGithubReposPage(username, page) {
  const url = new URL(`https://api.github.com/users/${username}/repos`);
  url.searchParams.set("type", "owner");
  url.searchParams.set("sort", "created");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    headers: createGithubHeaders(),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed (${response.status} ${response.statusText})`,
    );
  }

  return assertGithubRepos(await response.json());
}

/**
 * Fetches owner repositories across pages until enough eligible repos exist.
 * @param {string} username GitHub login.
 * @returns {Promise<GithubRepo[]>}
 */
async function fetchGithubRepos(username) {
  /** @type {GithubRepo[]} */
  const repos = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const pageRepos = await fetchGithubReposPage(username, page);
    repos.push(...pageRepos);

    const eligibleCount = repos.filter(isEligibleRepo).length;

    if (eligibleCount >= MAX_PROJECTS || pageRepos.length < PER_PAGE) {
      break;
    }
  }

  return repos;
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
 * Normalizes repository topics for portfolio cards.
 * @param {GithubRepo} repo Repository payload from GitHub.
 * @returns {string[]}
 */
function buildTopics(repo) {
  /** @type {string[]} */
  const topics = [];

  for (const topic of repo.topics ?? []) {
    const normalized = topic.trim();

    if (
      normalized.length === 0 ||
      topics.some((entry) => entry.toLowerCase() === normalized.toLowerCase())
    ) {
      continue;
    }

    topics.push(normalized);
  }

  return topics;
}

/**
 * Asserts a GitHub languages API payload and returns language names ordered by
 * bytes descending (primary language first).
 * @param {unknown} data Candidate API JSON body.
 * @param {string} label Path label for error messages.
 * @returns {string[]}
 */
function assertGithubLanguages(data, label) {
  if (!isRecord(data)) {
    throw new Error(`${label} must be an object`);
  }

  /** @type {{ language: string; bytes: number }[]} */
  const entries = [];

  for (const [language, bytes] of Object.entries(data)) {
    if (typeof language !== "string" || language.trim().length === 0) {
      throw new Error(`${label} keys must be non-empty language names`);
    }

    if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) {
      throw new Error(`${label}.${language} must be a non-negative number`);
    }

    entries.push({ bytes, language: language.trim() });
  }

  return entries
    .sort((left, right) => {
      const delta = right.bytes - left.bytes;

      if (delta !== 0) {
        return delta;
      }

      return left.language.localeCompare(right.language);
    })
    .map((entry) => entry.language);
}

/**
 * Fetches language byte breakdown for one repository.
 * @param {string} username GitHub login.
 * @param {string} repoName Repository name.
 * @returns {Promise<string[]>}
 */
async function fetchGithubLanguages(username, repoName) {
  const url = new URL(
    `https://api.github.com/repos/${username}/${repoName}/languages`,
  );

  const response = await fetch(url, {
    headers: createGithubHeaders(),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub languages request failed for ${repoName} (${response.status} ${response.statusText})`,
    );
  }

  return assertGithubLanguages(await response.json(), `languages[${repoName}]`);
}

/**
 * Maps a GitHub repository into the portfolio Project shape.
 * @param {GithubRepo} repo Repository payload from GitHub.
 * @param {string[]} languages Languages from the GitHub languages API.
 * @returns {Project}
 */
function mapGithubRepoToProject(repo, languages) {
  return {
    createdAt: repo.created_at,
    description:
      repo.description !== null && repo.description.trim().length > 0
        ? repo.description.trim()
        : "No description provided.",
    href: repo.html_url,
    languages,
    title: repo.name,
    topics: buildTopics(repo),
    updatedAt: repo.pushed_at,
  };
}

/**
 * Parses a date string to a finite timestamp for sorting.
 * @param {string} value Candidate ISO date string.
 * @returns {number} Parsed time, or `-Infinity` when the value is not a valid date.
 */
function toTimestamp(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

/**
 * Filters, sorts by newest created, fetches languages, and maps repositories.
 * @param {string} username GitHub login.
 * @param {GithubRepo[]} repos Raw GitHub repositories.
 * @returns {Promise<Project[]>}
 */
async function toProjects(username, repos) {
  const selected = repos
    .filter(isEligibleRepo)
    .sort((left, right) => {
      const delta =
        toTimestamp(right.created_at) - toTimestamp(left.created_at);

      if (delta !== 0) {
        return delta;
      }

      return left.name.localeCompare(right.name);
    })
    .slice(0, MAX_PROJECTS);

  return Promise.all(
    selected.map(async (repo) => {
      const languages = await fetchGithubLanguages(username, repo.name);
      return mapGithubRepoToProject(repo, languages);
    }),
  );
}

async function main() {
  const username = process.env.GITHUB_USERNAME ?? usernames.github;
  const repos = await fetchGithubRepos(username);
  const projects = assertProjects(await toProjects(username, repos));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");

  console.log(
    `Wrote ${projects.length} projects for ${username} to ${outputPath}`,
  );
}

main().catch(async (error) => {
  const message = error instanceof Error ? error.message : error;

  if (await pathExists(outputPath)) {
    console.warn(
      `GitHub projects fetch failed; keeping existing ${outputPath}`,
    );
    console.warn(message);
    return;
  }

  console.error(message);
  process.exitCode = 1;
});
