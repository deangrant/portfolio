import { ExperienceItem } from "@/pages/Home/components/ExperienceItem";
import styles from "./index.module.css";
import type { ExperienceSectionProps } from "./index.types";
import { sortEmploymentRoles } from "./sortEmploymentRoles";

/**
 * Renders the curated employment timeline.
 */
export function ExperienceSection({ roles }: ExperienceSectionProps) {
  const orderedRoles = sortEmploymentRoles(roles);

  return (
    <section aria-labelledby="experience-heading" className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title} id="experience-heading">
          Experience
        </h2>
        <span className={styles.countBadge}>{orderedRoles.length}</span>
      </div>
      <ol className={styles.list}>
        {orderedRoles.map((role) => (
          <ExperienceItem
            key={`${role.company}-${role.startYear}-${role.title}`}
            role={role}
          />
        ))}
      </ol>
    </section>
  );
}
