import { MainLayout } from "@/components/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HomePage } from "@/pages/Home";
import { createDocumentThemeApplicator } from "@/utils/themeApplicator";
import { createLocalThemeStorage } from "@/utils/themeStorage";

const themeStorage = createLocalThemeStorage();
const themeApplicator = createDocumentThemeApplicator();

/**
 * Root application composition: theme provider, layout, and home page.
 */
export function App() {
  return (
    <ThemeProvider applicator={themeApplicator} storage={themeStorage}>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  );
}
