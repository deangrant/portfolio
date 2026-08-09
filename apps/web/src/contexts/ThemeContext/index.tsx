import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_THEME } from "@/constants/theme.constants";
import type { Theme } from "@/types/theme.types";
import type { ThemeProviderProps } from "./index.types";
import { ThemeContext } from "./themeContext";

/**
 * Provides theme state and syncs it through injected applicator and storage.
 */
export function ThemeProvider({
  applicator,
  children,
  storage,
  defaultTheme = DEFAULT_THEME,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return storage.get() ?? defaultTheme;
  });

  useEffect(() => {
    applicator.apply(theme);
    storage.set(theme);
  }, [applicator, storage, theme]);

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
