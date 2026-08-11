import { useMemo, useState } from "react";
import { ProjectCard } from "@/pages/Home/components/ProjectCard";
import {
  collectAvailableTechStacks,
  filterProjectsByTechStack,
} from "./filterProjects";
import styles from "./index.module.css";
import type { ProjectsSectionProps } from "./index.types";
import { type ProjectSortKey, sortProjects } from "./sortProjects";
import { useProjectCarousel } from "./useProjectCarousel";

const TRACK_ID = "selected-projects-track";

/**
 * Renders the selected GitHub projects as a horizontal carousel.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [sortKey, setSortKey] = useState<ProjectSortKey>("created");
  const [selectedTechStack, setSelectedTechStack] = useState<string | null>(
    null,
  );

  const availableTechStacks = useMemo(
    () => collectAvailableTechStacks(projects),
    [projects],
  );

  const visibleProjects = useMemo(() => {
    const filtered = filterProjectsByTechStack(projects, selectedTechStack);
    return sortProjects(filtered, sortKey);
  }, [projects, selectedTechStack, sortKey]);

  const { canScrollNext, canScrollPrev, scrollBySlide, trackRef } =
    useProjectCarousel(visibleProjects);

  return (
    <section aria-labelledby="projects-heading" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title} id="projects-heading">
          Projects
        </h2>
        <div className={styles.headerActions}>
          <fieldset aria-label="Sort projects" className={styles.sortGroup}>
            <button
              aria-pressed={sortKey === "created"}
              className={
                sortKey === "created"
                  ? `${styles.sortButton} ${styles.sortButtonActive}`
                  : styles.sortButton
              }
              onClick={() => {
                setSortKey("created");
              }}
              type="button"
            >
              Created
            </button>
            <button
              aria-pressed={sortKey === "updated"}
              className={
                sortKey === "updated"
                  ? `${styles.sortButton} ${styles.sortButtonActive}`
                  : styles.sortButton
              }
              onClick={() => {
                setSortKey("updated");
              }}
              type="button"
            >
              Updated
            </button>
          </fieldset>
          <div className={styles.controls}>
            <button
              aria-controls={TRACK_ID}
              aria-label="Previous projects"
              className={styles.navButton}
              disabled={!canScrollPrev}
              onClick={() => {
                scrollBySlide(-1);
              }}
              type="button"
            >
              <svg
                aria-hidden="true"
                className={styles.navIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                viewBox="0 0 24 24"
              >
                <path d="M15 6 9 12l6 6" />
              </svg>
            </button>
            <button
              aria-controls={TRACK_ID}
              aria-label="Next projects"
              className={styles.navButton}
              disabled={!canScrollNext}
              onClick={() => {
                scrollBySlide(1);
              }}
              type="button"
            >
              <svg
                aria-hidden="true"
                className={styles.navIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                viewBox="0 0 24 24"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {availableTechStacks.length > 0 ? (
        <fieldset
          aria-label="Filter projects by tech stack"
          className={styles.filterGroup}
        >
          <button
            aria-pressed={selectedTechStack === null}
            className={
              selectedTechStack === null
                ? `${styles.filterButton} ${styles.filterButtonActive}`
                : styles.filterButton
            }
            onClick={() => {
              setSelectedTechStack(null);
            }}
            type="button"
          >
            All
          </button>
          {availableTechStacks.map((techStack) => {
            const isActive = selectedTechStack === techStack;

            return (
              <button
                aria-pressed={isActive}
                className={
                  isActive
                    ? `${styles.filterButton} ${styles.filterButtonActive}`
                    : styles.filterButton
                }
                key={techStack}
                onClick={() => {
                  setSelectedTechStack(isActive ? null : techStack);
                }}
                type="button"
              >
                {techStack}
              </button>
            );
          })}
        </fieldset>
      ) : null}
      <ul className={styles.track} id={TRACK_ID} ref={trackRef}>
        {visibleProjects.map((project) => (
          <li className={styles.slide} key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
