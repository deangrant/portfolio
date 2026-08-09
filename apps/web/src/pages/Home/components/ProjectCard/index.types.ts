import type { Project } from "@/types/portfolio.types";

/**
 * Props for a single selected-project card.
 * @property project Repository summary to display.
 */
export interface ProjectCardProps {
  project: Project;
}
