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
 * Reads a required non-empty string field from a record.
 * @param {Record<string, unknown>} record Object to read from.
 * @param {string} field Field name.
 * @param {string} label Path label for error messages.
 * @returns {string}
 */
function requireNonEmptyString(record, field, label) {
  const value = record[field];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label}.${field} must be a non-empty string`);
  }

  return value;
}

/**
 * Asserts one generated project entry.
 * @param {unknown} value Candidate project payload.
 * @param {number} index Array index for error messages.
 * @returns {Project}
 */
function assertProject(value, index) {
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
 * Asserts one generated article entry.
 * @param {unknown} value Candidate article payload.
 * @param {number} index Array index for error messages.
 * @returns {Article}
 */
function assertArticle(value, index) {
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
 * Validates mapped project output before writing generated JSON.
 * @param {unknown} data Candidate project list.
 * @returns {Project[]}
 */
export function assertProjects(data) {
  if (!Array.isArray(data)) {
    throw new Error("projects must be an array");
  }

  return data.map((entry, index) => assertProject(entry, index));
}

/**
 * Validates mapped article output before writing generated JSON.
 * @param {unknown} data Candidate article list.
 * @returns {Article[]}
 */
export function assertArticles(data) {
  if (!Array.isArray(data)) {
    throw new Error("articles must be an array");
  }

  return data.map((entry, index) => assertArticle(entry, index));
}
