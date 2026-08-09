import type { Article } from "@/types/portfolio.types";

/**
 * Props for the writing and essays section.
 * @property articles Featured Substack posts to list.
 */
export interface ArticlesSectionProps {
  articles: Article[];
}
