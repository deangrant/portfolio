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
 * Manages horizontal carousel scroll state and one-slide navigation.
 * @param resetKey Value that resets scroll position when it changes.
 */
export function useProjectCarousel(resetKey: unknown) {
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
  }, [resetKey, updateScrollState]);

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

  return {
    canScrollNext,
    canScrollPrev,
    scrollBySlide,
    trackRef,
  };
}
