import { useContext } from "react";
import type { ThemeContextValue } from "@/contexts/ThemeContext/index.types";
import { ThemeContext } from "@/contexts/ThemeContext/themeContext";

/**
 * Returns the active theme and toggle action from `ThemeProvider`.
 * @returns Narrow theme context value.
 * @throws When called outside a `ThemeProvider`.
 */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (value === null) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return value;
}
