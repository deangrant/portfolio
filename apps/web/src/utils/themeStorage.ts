import { THEME_STORAGE_KEY } from "@/constants/theme.constants";
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
 * Returns the browser localStorage when available.
 * @returns `window.localStorage`, or `null` outside a browser.
 */
function getBrowserLocalStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

/**
 * Creates a `ThemeStorage` adapter backed by the browser `localStorage` API.
 * @param storage Optional web storage implementation; falls back to
 * `window.localStorage` when called in a browser.
 * @returns Theme storage adapter for the theme provider.
 */
export function createLocalThemeStorage(storage?: Storage): ThemeStorage {
  const resolveStorage = (): Storage | null =>
    storage ?? getBrowserLocalStorage();

  return {
    get() {
      const activeStorage = resolveStorage();

      if (activeStorage === null) {
        return null;
      }

      try {
        const value = activeStorage.getItem(THEME_STORAGE_KEY);
        return isTheme(value) ? value : null;
      } catch {
        return null;
      }
    },
    set(theme) {
      const activeStorage = resolveStorage();

      if (activeStorage === null) {
        return;
      }

      try {
        activeStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Ignore quota or privacy-mode failures; theme still works in-session.
      }
    },
  };
}
