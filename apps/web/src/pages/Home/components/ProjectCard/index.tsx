import styles from "./index.module.css";
import type { ProjectCardProps } from "./index.types";

/**
 * Renders a minimal project summary with tech tags and a repository link.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <ul aria-label="Tech stack" className={styles.tags}>
        {project.techStack.map((tech) => (
          <li className={styles.tag} key={tech}>
            {tech}
          </li>
        ))}
      </ul>
      <a
        className={styles.link}
        href={project.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        View on GitHub
      </a>
    </article>
  );
}
