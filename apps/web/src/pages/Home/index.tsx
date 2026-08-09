import { PORTFOLIO } from "@/constants/portfolio.constants";
import { ArticlesSection } from "./components/ArticlesSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SocialLinks } from "./components/SocialLinks";
import styles from "./index.module.css";

/**
 * Composes the single-page portfolio sections from static content.
 * @returns Home page content for the main landmark.
 */
export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection name={PORTFOLIO.name} tagline={PORTFOLIO.tagline} />
      <SocialLinks links={PORTFOLIO.socialLinks} />
      <ProjectsSection projects={PORTFOLIO.projects} />
      <ArticlesSection articles={PORTFOLIO.articles} />
      <SiteFooter name={PORTFOLIO.name} />
    </div>
  );
}
