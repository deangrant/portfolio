import { createContext } from "react";
import type { ThemeContextValue } from "./index.types";

/**
 * React context holding the active theme and toggle action.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
