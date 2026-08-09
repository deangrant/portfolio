/**
 * Supported visual themes for the site.
 *
 * Valid values:
 *
 * - `dark`
 * - `light`
 */
export type Theme = "dark" | "light";

/**
 * Narrow persistence contract for reading and writing the preferred theme.
 */
export interface ThemeStorage {
  /**
   * Returns the stored theme, or `null` when none is stored or the value is
   * invalid.
   */
  get(): Theme | null;

  /**
   * Persists the preferred theme for later visits.
   */
  set(theme: Theme): void;
}

/**
 * Applies the active theme to the host document (e.g. `data-theme`).
 */
export interface ThemeApplicator {
  /**
   * Writes the theme into the document for CSS variable switching.
   */
  apply(theme: Theme): void;
}
