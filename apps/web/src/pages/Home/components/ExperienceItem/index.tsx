import styles from "./index.module.css";
import type { ExperienceItemProps } from "./index.types";

/**
 * Formats the inclusive year range for an employment role.
 * @param startYear Inclusive start calendar year.
 * @param endYear Inclusive end calendar year, or `null` for Present.
 */
function formatYearRange(startYear: number, endYear: number | null): string {
  const endLabel = endYear === null ? "Present" : String(endYear);
  return `${startYear} – ${endLabel}`;
}

/**
 * Renders one employment role on the vertical experience timeline.
 */
export function ExperienceItem({ role }: ExperienceItemProps) {
  const yearRange = formatYearRange(role.startYear, role.endYear);
  const dateTime =
    role.endYear === null
      ? `${role.startYear}/`
      : `${role.startYear}/${role.endYear}`;

  return (
    <li className={styles.item}>
      <span aria-hidden="true" className={styles.marker} />
      <div className={styles.content}>
        <h3 className={styles.title}>{role.title}</h3>
        <span aria-hidden="true" className={styles.separator}>
          ·
        </span>
        <span className={styles.company}>{role.company}</span>
      </div>
      <p className={styles.years}>
        <time dateTime={dateTime}>{yearRange}</time>
      </p>
    </li>
  );
}
