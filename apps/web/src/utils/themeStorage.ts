import { THEME_STORAGE_KEY } from "@/constants/portfolio.constants";
import type { Theme, ThemeStorage } from "@/types/theme.types";

/**
 * Returns whether a string is a supported theme value.
 * @param value Candidate value from storage.
 * @returns `true` when the value is `"dark"` or `"light"`.
 */
function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Creates a `ThemeStorage` adapter backed by the browser `localStorage` API.
 * @param storage Web storage implementation; defaults to `window.localStorage`.
 * @returns Theme storage adapter for the theme provider.
 */
export function createLocalThemeStorage(
  storage: Storage = window.localStorage,
): ThemeStorage {
  return {
    get() {
      try {
        const value = storage.getItem(THEME_STORAGE_KEY);
        return isTheme(value) ? value : null;
      } catch {
        return null;
      }
    },
    set(theme) {
      try {
        storage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Ignore quota or privacy-mode failures; theme still works in-session.
      }
    },
  };
}
