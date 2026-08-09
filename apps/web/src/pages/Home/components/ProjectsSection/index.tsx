import { ProjectCard } from "@/pages/Home/components/ProjectCard";
import styles from "./index.module.css";
import type { ProjectsSectionProps } from "./index.types";

/**
 * Renders the selected GitHub projects grid.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section aria-labelledby="projects-heading" className={styles.section}>
      <h2 className={styles.title} id="projects-heading">
        Selected Projects
      </h2>
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
