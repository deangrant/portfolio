import { PORTFOLIO } from "@/constants/portfolio.constants";
import githubProjects from "@/data/github-projects.generated.json";
import substackArticles from "@/data/substack-articles.generated.json";
import {
  parseArticles,
  parseProjects,
} from "@/utils/parseGeneratedPortfolioData";
import { ArticlesSection } from "./components/ArticlesSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SocialLinks } from "./components/SocialLinks";
import styles from "./index.module.css";

const projects = parseProjects(githubProjects);
const articles = parseArticles(substackArticles);

/**
 * Composes the single-page portfolio sections from static content and
 * build-time GitHub projects and Substack articles.
 */
export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection name={PORTFOLIO.name} tagline={PORTFOLIO.tagline} />
      <SocialLinks links={PORTFOLIO.socialLinks} />
      {projects.length > 0 ? <ProjectsSection projects={projects} /> : null}
      {articles.length > 0 ? <ArticlesSection articles={articles} /> : null}
      <SiteFooter name={PORTFOLIO.name} />
    </div>
  );
}
