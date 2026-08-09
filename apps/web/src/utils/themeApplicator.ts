import type { Theme, ThemeApplicator } from "@/types/theme.types";

/**
 * Creates a `ThemeApplicator` that sets `data-theme` on the document root.
 * @returns Theme applicator for the theme provider.
 */
export function createDocumentThemeApplicator(): ThemeApplicator {
  return {
    apply(theme: Theme) {
      document.documentElement.setAttribute("data-theme", theme);
    },
  };
}
