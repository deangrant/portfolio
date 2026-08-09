import { useRef } from "react";
import styles from "./index.module.css";
import type { ProjectCardProps } from "./index.types";
import { useVisibleTopicCount } from "./useVisibleTopicCount";

/**
 * Renders a minimal project summary with topic tags and a repository link.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const topicsContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);
  const visibleCount = useVisibleTopicCount(
    project.topics,
    topicsContainerRef,
    measureRef,
  );

  const visibleTopics = project.topics.slice(0, visibleCount);
  const hiddenTopics = project.topics.slice(visibleCount);
  const hiddenCount = hiddenTopics.length;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      {project.topics.length > 0 ? (
        <div className={styles.topics} ref={topicsContainerRef}>
          <ul aria-hidden="true" className={styles.measure} ref={measureRef}>
            {project.topics.map((topic) => (
              <li className={styles.tag} key={topic}>
                {topic}
              </li>
            ))}
          </ul>
          <ul aria-label="Topics" className={styles.topicRow}>
            {visibleTopics.map((topic) => (
              <li className={styles.tag} key={topic}>
                {topic}
              </li>
            ))}
          </ul>
          {hiddenCount > 0 ? (
            <ul aria-label="Additional topics" className={styles.overflowRow}>
              <li
                aria-label={`${hiddenCount} more topics: ${hiddenTopics.join(", ")}`}
                className={styles.tag}
              >
                +{hiddenCount}
              </li>
            </ul>
          ) : null}
        </div>
      ) : null}
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
