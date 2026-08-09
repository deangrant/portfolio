import type { ReactNode } from "react";
import type { Theme, ThemeStorage } from "@/types/theme.types";

/**
 * Value exposed by the theme context to consumers.
 * @property theme Active visual theme.
 * @property toggleTheme Switches between dark and light themes.
 */
export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Props for the theme provider.
 * @property children Tree that can read the theme context.
 * @property storage Optional persistence adapter; defaults to localStorage.
 * @property defaultTheme Theme used when storage has no valid value.
 */
export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storage?: ThemeStorage;
}
