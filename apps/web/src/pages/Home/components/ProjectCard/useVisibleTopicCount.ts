import { type RefObject, useEffect, useState } from "react";

/**
 * Returns how many topic pills fit on one line of the measured container.
 * @param topics Topics to measure.
 * @param containerRef Element whose client width is the available line width.
 * @param measureRef Hidden row containing one child per topic for width measurement.
 * @returns Count of pills that fit without wrapping.
 */
export function useVisibleTopicCount(
  topics: readonly string[],
  containerRef: RefObject<HTMLElement | null>,
  measureRef: RefObject<HTMLElement | null>,
): number {
  const [visibleCount, setVisibleCount] = useState(topics.length);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (container === null || measure === null) {
      return;
    }

    const updateVisibleCount = () => {
      const availableWidth = container.clientWidth;

      if (availableWidth <= 0) {
        return;
      }

      const items = Array.from(measure.children) as HTMLElement[];
      const measureStyles = getComputedStyle(measure);
      const gapValue = measureStyles.columnGap || measureStyles.gap || "0";
      const gap = Number.parseFloat(gapValue) || 0;

      let usedWidth = 0;
      let count = 0;

      for (const item of items) {
        const itemWidth = item.getBoundingClientRect().width;
        const nextWidth = count === 0 ? itemWidth : usedWidth + gap + itemWidth;

        if (nextWidth > availableWidth + 0.5) {
          break;
        }

        usedWidth = nextWidth;
        count += 1;
      }

      setVisibleCount(count);
    };

    updateVisibleCount();

    const observer = new ResizeObserver(() => {
      updateVisibleCount();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, measureRef, topics]);

  return visibleCount;
}
