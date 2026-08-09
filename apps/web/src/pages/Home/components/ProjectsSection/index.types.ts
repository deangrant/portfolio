import type { Project } from "@/types/portfolio.types";

/**
 * Props for the selected projects section.
 */
export interface ProjectsSectionProps {
  /** Repository cards to render. */
  projects: Project[];
}
