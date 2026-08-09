import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_USERNAME = "deangrant";
const MAX_PROJECTS = 12;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  __dirname,
  "../src/data/github-projects.generated.json",
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
 * Fetches public owner repositories for a GitHub user.
 * @param {string} username GitHub login.
 * @returns {Promise<GithubRepo[]>}
 */
async function fetchGithubRepos(username) {
  const url = new URL(`https://api.github.com/users/${username}/repos`);
  url.searchParams.set("type", "owner");
  url.searchParams.set("sort", "created");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("per_page", "100");

  const response = await fetch(url, { headers: createGithubHeaders() });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub API request failed (${response.status} ${response.statusText}): ${body}`,
    );
  }

  return /** @type {GithubRepo[]} */ (await response.json());
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
 * Maps a GitHub repository into the portfolio Project shape.
 * @param {GithubRepo} repo Repository payload from GitHub.
 * @returns {Project}
 */
function mapGithubRepoToProject(repo) {
  return {
    createdAt: repo.created_at,
    description:
      repo.description !== null && repo.description.trim().length > 0
        ? repo.description.trim()
        : "No description provided.",
    href: repo.html_url,
    title: repo.name,
    topics: buildTopics(repo),
    updatedAt: repo.pushed_at,
  };
}

/**
 * Filters, sorts by newest created, and maps repositories for the carousel.
 * @param {GithubRepo[]} repos Raw GitHub repositories.
 * @returns {Project[]}
 */
function toProjects(repos) {
  return repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !repo.private &&
        typeof repo.name === "string" &&
        repo.name.length > 0,
    )
    .sort(
      (left, right) =>
        Date.parse(right.created_at) - Date.parse(left.created_at),
    )
    .slice(0, MAX_PROJECTS)
    .map(mapGithubRepoToProject);
}

async function main() {
  const username = process.env.GITHUB_USERNAME ?? DEFAULT_USERNAME;
  const repos = await fetchGithubRepos(username);
  const projects = toProjects(repos);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");

  console.log(
    `Wrote ${projects.length} projects for ${username} to ${outputPath}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
