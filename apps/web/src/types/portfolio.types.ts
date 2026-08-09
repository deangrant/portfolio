/**
 * Identifier for a social or contact channel shown in the header links.
 */
export type SocialChannel = "github" | "linkedin" | "substack" | "x" | "email";

/**
 * A single social or contact link rendered in the social links row.
 * @property channel Stable channel key used for icons and labels.
 * @property href Destination URL or `mailto:` address.
 * @property label Accessible and visible label for the link.
 */
export interface SocialLink {
  channel: SocialChannel;
  href: string;
  label: string;
}

/**
 * A featured GitHub repository card in the projects section.
 * @property description Short summary of what the project does.
 * @property href Direct URL to the GitHub repository.
 * @property techStack Technology labels shown as tags.
 * @property title Repository or project display name.
 */
export interface Project {
  description: string;
  href: string;
  techStack: string[];
  title: string;
}

/**
 * A featured Substack essay entry in the writing section.
 * @property href Direct URL to the Substack post.
 * @property publishedAt ISO date string (`YYYY-MM-DD`) for the publication date.
 * @property readTime Human-readable estimated reading time.
 * @property summary One-sentence teaser for the article.
 * @property title Article headline.
 */
export interface Article {
  href: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  title: string;
}

/**
 * Static portfolio content consumed by the Home page sections.
 * @property articles Featured Substack essays.
 * @property name Display name used in the hero and footer.
 * @property projects Selected GitHub repositories.
 * @property socialLinks Primary contact channels.
 * @property tagline Hero bio line under the name.
 */
export interface PortfolioContent {
  articles: Article[];
  name: string;
  projects: Project[];
  socialLinks: SocialLink[];
  tagline: string;
}
