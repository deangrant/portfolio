import type { Article, Project } from "@/types/portfolio.types";

/**
 * Returns whether a value is a non-null object record.
 * @param value Candidate value.
 * @returns `true` when the value is a plain object.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Reads a required non-empty string field from a record.
 * @param record Object to read from.
 * @param field Field name.
 * @param label Path label for error messages.
 * @returns Trimmed non-empty string value.
 */
function requireNonEmptyString(
  record: Record<string, unknown>,
  field: string,
  label: string,
): string {
  const value = record[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}.${field} must be a non-empty string`);
  }

  return value;
}

/**
 * Parses one generated project entry.
 * @param value Candidate project payload.
 * @param index Array index for error messages.
 * @returns Validated project.
 */
function parseProject(value: unknown, index: number): Project {
  const label = `projects[${index}]`;

  if (!isRecord(value)) {
    throw new Error(`${label} must be an object`);
  }

  const topics = value.topics;

  if (
    !Array.isArray(topics) ||
    topics.some((topic) => typeof topic !== "string")
  ) {
    throw new Error(`${label}.topics must be an array of strings`);
  }

  return {
    createdAt: requireNonEmptyString(value, "createdAt", label),
    description: requireNonEmptyString(value, "description", label),
    href: requireNonEmptyString(value, "href", label),
    title: requireNonEmptyString(value, "title", label),
    topics,
    updatedAt: requireNonEmptyString(value, "updatedAt", label),
  };
}

/**
 * Parses one generated article entry.
 * @param value Candidate article payload.
 * @param index Array index for error messages.
 * @returns Validated article.
 */
function parseArticle(value: unknown, index: number): Article {
  const label = `articles[${index}]`;

  if (!isRecord(value)) {
    throw new Error(`${label} must be an object`);
  }

  return {
    href: requireNonEmptyString(value, "href", label),
    publishedAt: requireNonEmptyString(value, "publishedAt", label),
    readTime: requireNonEmptyString(value, "readTime", label),
    summary: requireNonEmptyString(value, "summary", label),
    title: requireNonEmptyString(value, "title", label),
  };
}

/**
 * Validates generated GitHub project JSON before the UI consumes it.
 * @param data Unknown import from `github-projects.generated.json`.
 * @returns Typed project list.
 */
export function parseProjects(data: unknown): Project[] {
  if (!Array.isArray(data)) {
    throw new Error("projects must be an array");
  }

  return data.map((entry, index) => parseProject(entry, index));
}

/**
 * Validates generated Substack article JSON before the UI consumes it.
 * @param data Unknown import from `substack-articles.generated.json`.
 * @returns Typed article list.
 */
export function parseArticles(data: unknown): Article[] {
  if (!Array.isArray(data)) {
    throw new Error("articles must be an array");
  }

  return data.map((entry, index) => parseArticle(entry, index));
}
