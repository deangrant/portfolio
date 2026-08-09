import type { Project } from "@/types/portfolio.types";

/**
 * Props for the selected projects section.
 * @property projects Repository cards to render.
 */
export interface ProjectsSectionProps {
  projects: Project[];
}
