import { ThemeToggle } from "@/components/core/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import styles from "./index.module.css";
import type { MainLayoutProps } from "./index.types";

/**
 * Renders the page shell with theme control and a centered content column.
 */
export function MainLayout({ children }: MainLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.shell}>
      <div className={styles.topBar}>
        <ThemeToggle onToggle={toggleTheme} theme={theme} />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
