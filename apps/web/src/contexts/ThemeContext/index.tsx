import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_THEME } from "@/constants/portfolio.constants";
import type { Theme, ThemeStorage } from "@/types/theme.types";
import { createLocalThemeStorage } from "@/utils/themeStorage";
import type { ThemeProviderProps } from "./index.types";
import { ThemeContext } from "./themeContext";

let defaultStorage: ThemeStorage | undefined;

/**
 * Returns a shared localStorage-backed theme adapter, created once.
 * @returns Default theme storage implementation.
 */
function getDefaultStorage(): ThemeStorage {
  if (defaultStorage === undefined) {
    defaultStorage = createLocalThemeStorage();
  }

  return defaultStorage;
}

/**
 * Applies a theme to the document root for CSS variable switching.
 * @param theme Theme to apply as `data-theme`.
 */
function applyThemeToDocument(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Provides theme state, document attribute sync, and optional persistence.
 * @param props Provider configuration and children.
 * @returns Theme context provider element.
 */
export function ThemeProvider({
  children,
  storage = getDefaultStorage(),
  defaultTheme = DEFAULT_THEME,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return storage.get() ?? defaultTheme;
  });

  useEffect(() => {
    applyThemeToDocument(theme);
    storage.set(theme);
  }, [storage, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
