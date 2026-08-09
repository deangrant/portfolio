import styles from "./index.module.css";
import type { SiteFooterProps } from "./index.types";

/**
 * Renders the copyright footer for the portfolio page.
 */
export function SiteFooter({ name }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © {year} {name}.
      </p>
    </footer>
  );
}
