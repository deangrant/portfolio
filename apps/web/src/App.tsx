import { MainLayout } from "@/components/layouts/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HomePage } from "@/pages/Home";

/**
 * Root application composition: theme provider, layout, and home page.
 * @returns Application tree.
 */
export function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  );
}
