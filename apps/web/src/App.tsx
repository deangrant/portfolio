import { MainLayout } from "@/components/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HomePage } from "@/pages/Home";
import type { ThemeApplicator, ThemeStorage } from "@/types/theme.types";

/**
 * Props for the root application shell.
 */
export type AppProps = {
  /**
   * Applies the active theme to the host document.
   */
  applicator: ThemeApplicator;

  /**
   * Persists and restores the preferred theme.
   */
  storage: ThemeStorage;
};

/**
 * Composes the theme provider, main layout, and home page.
 */
export function App({ applicator, storage }: AppProps) {
  return (
    <ThemeProvider applicator={applicator} storage={storage}>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  );
}
