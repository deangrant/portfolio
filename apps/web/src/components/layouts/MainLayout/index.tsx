import { ThemeToggle } from "@/components/core/ThemeToggle";
import styles from "./index.module.css";
import type { MainLayoutProps } from "./index.types";

/**
 * Page shell with theme control and a centered content column.
 * @param props Layout children for the main landmark.
 * @returns Site layout element.
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.topBar}>
        <ThemeToggle />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
