import githubProjects from "@/assets/data/github-projects.generated.json";
import { PORTFOLIO } from "@/constants/portfolio.constants";
import { parseProjects } from "@/utils/parseGeneratedPortfolioData";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SocialLinks } from "./components/SocialLinks";
import styles from "./index.module.css";

const projects = parseProjects(githubProjects);

/**
 * Composes the single-page portfolio sections from static content and
 * build-time GitHub projects.
 *
 * Writing (ArticlesSection) is intentionally not mounted until that content
 * is ready to release.
 */
export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection name={PORTFOLIO.name} tagline={PORTFOLIO.tagline} />
      <SocialLinks links={PORTFOLIO.socialLinks} />
      {projects.length > 0 ? <ProjectsSection projects={projects} /> : null}
      <SiteFooter name={PORTFOLIO.name} />
    </div>
  );
}
