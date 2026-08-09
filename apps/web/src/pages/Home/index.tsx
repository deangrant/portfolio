import { PORTFOLIO } from "@/constants/portfolio.constants";
import githubProjects from "@/data/github-projects.generated.json";
import type { Project } from "@/types/portfolio.types";
import { ArticlesSection } from "./components/ArticlesSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SocialLinks } from "./components/SocialLinks";
import styles from "./index.module.css";

const projects = githubProjects as Project[];

/**
 * Composes the single-page portfolio sections from static content and
 * build-time GitHub projects.
 */
export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection name={PORTFOLIO.name} tagline={PORTFOLIO.tagline} />
      <SocialLinks links={PORTFOLIO.socialLinks} />
      <ProjectsSection projects={projects} />
      <ArticlesSection articles={PORTFOLIO.articles} />
      <SiteFooter name={PORTFOLIO.name} />
    </div>
  );
}
