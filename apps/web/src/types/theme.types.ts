/**
 * Supported visual themes for the site.
 */
export type Theme = "dark" | "light";

/**
 * Narrow persistence contract for reading and writing the preferred theme.
 */
export interface ThemeStorage {
  /**
   * Returns the stored theme, or `null` when none is stored or the value is
   * invalid.
   * @returns The persisted theme, or `null`.
   */
  get(): Theme | null;

  /**
   * Persists the preferred theme for later visits.
   * @param theme Theme value to store.
   */
  set(theme: Theme): void;
}
