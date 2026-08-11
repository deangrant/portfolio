import { useCallback, useEffect, useRef, useState } from "react";

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
 * Reads how many slides fit in the track from the CSS custom property.
 * @param track Scrollable carousel track element.
 */
function getVisibleCount(track: HTMLElement): number {
  const raw = getComputedStyle(track).getPropertyValue("--carousel-visible");
  const parsed = Number.parseInt(raw.trim(), 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * Returns the largest start index that still fills a full visible page.
 * @param track Scrollable carousel track element.
 */
function getMaxStartIndex(track: HTMLElement): number {
  const slideCount = track.querySelectorAll(":scope > li").length;
  return Math.max(0, slideCount - getVisibleCount(track));
}

/**
 * Derives the current start index from scroll position.
 * @param track Scrollable carousel track element.
 */
function getStartIndex(track: HTMLElement): number {
  const step = getSlideStep(track);

  if (step === 0) {
    return 0;
  }

  return Math.round(track.scrollLeft / step);
}

/**
 * Clamps a start index to a full last page of visible slides.
 * @param track Scrollable carousel track element.
 * @param startIndex Candidate start index.
 */
function clampStartIndex(track: HTMLElement, startIndex: number): number {
  const maxStartIndex = getMaxStartIndex(track);
  return Math.min(maxStartIndex, Math.max(0, startIndex));
}

/**
 * Manages horizontal carousel scroll state and one-slide navigation.
 * @param resetKey Value that resets scroll position when it changes.
 */
export function useProjectCarousel(resetKey: unknown) {
  const trackRef = useRef<HTMLUListElement>(null);
  const startIndexRef = useRef(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncButtonState = useCallback(
    (startIndex: number, maxStartIndex: number) => {
      startIndexRef.current = startIndex;
      setCanScrollPrev(startIndex > 0);
      setCanScrollNext(startIndex < maxStartIndex);
    },
    [],
  );

  const scrollToStartIndex = useCallback(
    (startIndex: number, behavior: ScrollBehavior) => {
      const track = trackRef.current;

      if (track === null) {
        return;
      }

      const step = getSlideStep(track);

      if (step === 0) {
        return;
      }

      const maxStartIndex = getMaxStartIndex(track);
      const nextIndex = clampStartIndex(track, startIndex);

      syncButtonState(nextIndex, maxStartIndex);
      track.scrollTo({ behavior, left: nextIndex * step });
    },
    [syncButtonState],
  );

  const settleToNearestPage = useCallback(() => {
    const track = trackRef.current;

    if (track === null) {
      return;
    }

    scrollToStartIndex(getStartIndex(track), "smooth");
  }, [scrollToStartIndex]);

  useEffect(() => {
    const track = trackRef.current;

    if (track === null) {
      return;
    }

    startIndexRef.current = 0;
    scrollToStartIndex(0, "auto");

    const clampScrollOverflow = () => {
      const step = getSlideStep(track);

      if (step === 0) {
        return;
      }

      const maxScrollLeft = getMaxStartIndex(track) * step;

      if (track.scrollLeft > maxScrollLeft) {
        track.scrollLeft = maxScrollLeft;
      }
    };

    track.addEventListener("scroll", clampScrollOverflow, { passive: true });
    track.addEventListener("scrollend", settleToNearestPage);

    const observer = new ResizeObserver(() => {
      scrollToStartIndex(startIndexRef.current, "auto");
    });
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", clampScrollOverflow);
      track.removeEventListener("scrollend", settleToNearestPage);
      observer.disconnect();
    };
  }, [resetKey, scrollToStartIndex, settleToNearestPage]);

  const scrollBySlide = useCallback(
    (direction: -1 | 1) => {
      scrollToStartIndex(startIndexRef.current + direction, "smooth");
    },
    [scrollToStartIndex],
  );

  return {
    canScrollNext,
    canScrollPrev,
    scrollBySlide,
    trackRef,
  };
}
