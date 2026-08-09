import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard } from "@/pages/Home/components/ProjectCard";
import type { Project } from "@/types/portfolio.types";
import styles from "./index.module.css";
import type { ProjectsSectionProps } from "./index.types";

const TRACK_ID = "selected-projects-track";

/**
 * Sort keys available in the projects carousel.
 */
type ProjectSortKey = "created" | "updated";

/**
 * Returns the pixel width of one carousel slide, including its trailing gap.
 * @param track Scrollable carousel track element.
 * @returns Width used for one-step scroll, or `0` when unknown.
 */
function getSlideStep(track: HTMLElement): number {
  const slide = track.querySelector<HTMLElement>(":scope > li");

  if (slide === null) {
    return 0;
  }

  const trackStyles = getComputedStyle(track);
  const gapValue = trackStyles.columnGap || trackStyles.gap || "0";
  const gap = Number.parseFloat(gapValue) || 0;

  return slide.getBoundingClientRect().width + gap;
}

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
 * @returns Sorted copy of the projects array.
 */
function sortProjects(projects: Project[], sortKey: ProjectSortKey): Project[] {
  const dateKey = sortKey === "created" ? "createdAt" : "updatedAt";

  return [...projects].sort((left, right) => {
    const delta = toTimestamp(right[dateKey]) - toTimestamp(left[dateKey]);

    if (delta !== 0) {
      return delta;
    }

    return left.title.localeCompare(right.title);
  });
}

/**
 * Renders the selected GitHub projects as a horizontal carousel.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [sortKey, setSortKey] = useState<ProjectSortKey>("created");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const sortedProjects = useMemo(
    () => sortProjects(projects, sortKey),
    [projects, sortKey],
  );

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (track === null) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const { scrollLeft } = track;

    setCanScrollPrev(scrollLeft > 1);
    setCanScrollNext(scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (track === null) {
      return;
    }

    track.scrollLeft = 0;
    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });

    const observer = new ResizeObserver(() => {
      updateScrollState();
    });
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [sortedProjects, updateScrollState]);

  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;

    if (track === null) {
      return;
    }

    const step = getSlideStep(track);

    if (step === 0) {
      return;
    }

    track.scrollBy({ behavior: "smooth", left: direction * step });
  }, []);

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
      <ul className={styles.track} id={TRACK_ID} ref={trackRef}>
        {sortedProjects.map((project) => (
          <li className={styles.slide} key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
