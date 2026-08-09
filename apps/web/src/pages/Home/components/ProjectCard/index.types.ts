import type { Project } from "@/types/portfolio.types";

/**
 * Props for a single selected-project card.
 */
export interface ProjectCardProps {
  /** Repository summary to display. */
  project: Project;
}
