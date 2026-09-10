/**
 * Minimum viewport width (px) for the medium layout breakpoint.
 * Keep in sync with `@media (min-width: 640px)` in CSS modules.
 */
export const LAYOUT_MD_MIN_PX = 640;

/**
 * `matchMedia` query for the medium layout breakpoint.
 */
export const LAYOUT_MD_MEDIA_QUERY = `(min-width: ${LAYOUT_MD_MIN_PX}px)`;
