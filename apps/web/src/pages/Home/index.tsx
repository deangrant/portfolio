import employment from "@/assets/data/employment.json";
import githubProjects from "@/assets/data/github-projects.generated.json";
import substackArticles from "@/assets/data/substack-articles.generated.json";
import { PORTFOLIO } from "@/constants/portfolio.constants";
import {
  parseArticles,
  parseEmployment,
  parseProjects,
} from "@/utils/parseGeneratedPortfolioData";
import { ArticlesSection } from "./components/ArticlesSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SocialLinks } from "./components/SocialLinks";
import styles from "./index.module.css";

const projects = parseProjects(githubProjects);
const articles = parseArticles(substackArticles);
const roles = parseEmployment(employment);

/**
 * Composes the single-page portfolio sections from static content,
 * build-time GitHub projects and Substack articles, and curated employment.
 */
export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroSection name={PORTFOLIO.name} tagline={PORTFOLIO.tagline} />
      <SocialLinks links={PORTFOLIO.socialLinks} />
      {projects.length > 0 ? <ProjectsSection projects={projects} /> : null}
      {articles.length > 0 ? <ArticlesSection articles={articles} /> : null}
      {roles.length > 0 ? <ExperienceSection roles={roles} /> : null}
      <SiteFooter name={PORTFOLIO.name} />
    </div>
  );
}
