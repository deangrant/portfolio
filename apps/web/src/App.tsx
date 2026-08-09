import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HomePage } from "@/pages/Home";
import { createDocumentThemeApplicator } from "@/utils/themeApplicator";
import { createLocalThemeStorage } from "@/utils/themeStorage";

/**
 * Root application composition: theme provider, layout, and home page.
 */
export function App() {
  const [{ applicator, storage }] = useState(() => ({
    applicator: createDocumentThemeApplicator(),
    storage: createLocalThemeStorage(),
  }));

  return (
    <ThemeProvider applicator={applicator} storage={storage}>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  );
}
