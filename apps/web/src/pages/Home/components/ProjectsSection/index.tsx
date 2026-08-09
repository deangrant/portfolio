import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/pages/Home/components/ProjectCard";
import styles from "./index.module.css";
import type { ProjectsSectionProps } from "./index.types";

const TRACK_ID = "selected-projects-track";

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
 * Renders the selected GitHub projects as a horizontal carousel.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
  }, [projects, updateScrollState]);

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
      <ul className={styles.track} id={TRACK_ID} ref={trackRef}>
        {projects.map((project) => (
          <li className={styles.slide} key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
