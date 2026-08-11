import type { Project } from "@/types/portfolio.types";

/**
 * Collects unique GitHub languages present on the given projects.
 * @param projects Projects whose languages should be scanned.
 * @returns Alphabetically sorted language names available for filtering.
 */
export function collectAvailableTechStacks(projects: Project[]): string[] {
  const available = new Set<string>();

  for (const project of projects) {
    for (const language of project.languages) {
      available.add(language);
    }
  }

  return [...available].sort((left, right) => left.localeCompare(right));
}

/**
 * Filters projects to those that include the selected language.
 * @param projects Projects to filter.
 * @param selected Language name, or `null` to keep every project.
 */
export function filterProjectsByTechStack(
  projects: Project[],
  selected: string | null,
): Project[] {
  if (selected === null) {
    return projects;
  }

  return projects.filter((project) => project.languages.includes(selected));
}
