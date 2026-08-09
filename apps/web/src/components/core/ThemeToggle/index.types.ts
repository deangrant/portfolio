import type { Theme } from "@/types/theme.types";

/**
 * Props for the presentational theme toggle control.
 */
export interface ThemeToggleProps {
  /** Optional class name merged onto the button. */
  className?: string;

  /** Handler invoked when the user activates the toggle. */
  onToggle: () => void;

  /** Active visual theme used to choose the icon and accessible label. */
  theme: Theme;
}
