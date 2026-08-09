import styles from "./index.module.css";
import type { SiteFooterProps } from "./index.types";

/**
 * Renders the copyright footer for the portfolio page.
 * @param props Name shown in the copyright line.
 * @returns Footer element with the current year.
 */
export function SiteFooter({ name }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © {year} {name}. Built with simplicity in mind.
      </p>
    </footer>
  );
}
