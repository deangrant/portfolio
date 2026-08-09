/**
 * Identifier for a social or contact channel shown in the header links.
 *
 * Valid values:
 *
 * - `github`
 * - `linkedin`
 * - `substack`
 * - `x`
 * - `email`
 */
export type SocialChannel = "github" | "linkedin" | "substack" | "x" | "email";

/**
 * A single social or contact link rendered in the social links row.
 */
export interface SocialLink {
  /** Stable channel key used for icons and labels. */
  channel: SocialChannel;

  /** Destination URL or `mailto:` address. */
  href: string;

  /** Accessible and visible label for the link. */
  label: string;
}

/**
 * A featured GitHub repository card in the projects section.
 */
export interface Project {
  /** Short summary of what the project does. */
  description: string;

  /** Direct URL to the GitHub repository. */
  href: string;

  /** Technology labels shown as tags. */
  techStack: string[];

  /** Repository or project display name. */
  title: string;
}

/**
 * A featured Substack essay entry in the writing section.
 */
export interface Article {
  /** Direct URL to the Substack post. */
  href: string;

  /** ISO date string (`YYYY-MM-DD`) for the publication date. */
  publishedAt: string;

  /** Human-readable estimated reading time. */
  readTime: string;

  /** One-sentence teaser for the article. */
  summary: string;

  /** Article headline. */
  title: string;
}

/**
 * Static portfolio content consumed by the Home page sections.
 */
export interface PortfolioContent {
  /** Featured Substack essays. */
  articles: Article[];

  /** Display name used in the hero and footer. */
  name: string;

  /** Selected GitHub repositories. */
  projects: Project[];

  /** Primary contact channels. */
  socialLinks: SocialLink[];

  /** Hero bio line under the name. */
  tagline: string;
}
