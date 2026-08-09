import styles from "./index.module.css";
import type { HeroSectionProps } from "./index.types";

/**
 * Renders the site name and bio tagline as the page hero.
 */
export function HeroSection({ name, tagline }: HeroSectionProps) {
  return (
    <header className={styles.hero}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.tagline}>{tagline}</p>
    </header>
  );
}
