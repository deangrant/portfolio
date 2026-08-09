import styles from "./index.module.css";
import type { ThemeToggleProps } from "./index.types";

/**
 * Presentational button that requests a theme switch via props.
 */
export function ThemeToggle({ className, onToggle, theme }: ThemeToggleProps) {
  const nextLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      aria-label={nextLabel}
      className={
        className === undefined
          ? styles.toggle
          : `${styles.toggle} ${className}`
      }
      onClick={onToggle}
      title={nextLabel}
      type="button"
    >
      {theme === "dark" ? (
        <svg
          aria-hidden="true"
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
        </svg>
      )}
    </button>
  );
}
