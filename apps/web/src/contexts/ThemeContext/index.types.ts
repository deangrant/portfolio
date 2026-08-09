import type { ReactNode } from "react";
import type { Theme, ThemeApplicator, ThemeStorage } from "@/types/theme.types";

/**
 * Value exposed by the theme context to consumers.
 */
export interface ThemeContextValue {
  /** Active visual theme. */
  theme: Theme;

  /** Switches between dark and light themes. */
  toggleTheme: () => void;
}

/**
 * Props for the theme provider.
 */
export interface ThemeProviderProps {
  /** Writes the active theme onto the host document. */
  applicator: ThemeApplicator;

  /** Tree that can read the theme context. */
  children: ReactNode;

  /** Theme used when storage has no valid value. */
  defaultTheme?: Theme;

  /** Persistence adapter for reading and writing the preferred theme. */
  storage: ThemeStorage;
}
