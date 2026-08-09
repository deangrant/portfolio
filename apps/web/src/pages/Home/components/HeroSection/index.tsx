import styles from "./index.module.css";
import type { HeroSectionProps } from "./index.types";

/**
 * Renders the site name and bio tagline as the page hero.
 * @param props Name and tagline content.
 * @returns Hero header section.
 */
export function HeroSection({ name, tagline }: HeroSectionProps) {
  return (
    <header className={styles.hero}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.tagline}>{tagline}</p>
    </header>
  );
}
