import type { Project } from "@/types/portfolio.types";

/**
 * Sort keys available in the projects carousel.
 */
export type ProjectSortKey = "created" | "updated";

/**
 * Parses a date string to a finite timestamp for sorting.
 * @param value Candidate ISO date string.
 * @returns Parsed time, or `-Infinity` when the value is not a valid date.
 */
function toTimestamp(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

/**
 * Returns a new project list sorted by the active date key, newest first.
 * @param projects Projects to sort.
 * @param sortKey Created or updated ordering.
 */
export function sortProjects(
  projects: Project[],
  sortKey: ProjectSortKey,
): Project[] {
  const dateKey = sortKey === "created" ? "createdAt" : "updatedAt";

  return [...projects].sort((left, right) => {
    const delta = toTimestamp(right[dateKey]) - toTimestamp(left[dateKey]);

    if (delta !== 0) {
      return delta;
    }

    return left.title.localeCompare(right.title);
  });
}
