import type { Article } from "@/types/portfolio.types";

/**
 * Props for the writing and essays section.
 */
export interface ArticlesSectionProps {
  /** Featured Substack posts to list. */
  articles: Article[];
}
