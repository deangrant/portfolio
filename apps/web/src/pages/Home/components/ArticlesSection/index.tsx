import { useState } from "react";
import { ArticleItem } from "@/pages/Home/components/ArticleItem";
import styles from "./index.module.css";
import type { ArticlesSectionProps } from "./index.types";

const LIST_ID = "writing-articles-list";
const VISIBLE_ARTICLE_COUNT = 3;

/**
 * Renders the featured Substack writing list with optional show-more control.
 */
export function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = articles.length > VISIBLE_ARTICLE_COUNT;
  const visibleArticles = isExpanded
    ? articles
    : articles.slice(0, VISIBLE_ARTICLE_COUNT);

  return (
    <section aria-labelledby="writing-heading" className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.title} id="writing-heading">
          Writing
        </h2>
        <span className={styles.countBadge}>{articles.length}</span>
      </div>
      <ul className={styles.list} id={LIST_ID}>
        {visibleArticles.map((article) => (
          <ArticleItem article={article} key={article.href} />
        ))}
      </ul>
      {hasMore ? (
        <button
          aria-controls={LIST_ID}
          aria-expanded={isExpanded}
          className={styles.toggle}
          onClick={() => {
            setIsExpanded((current) => !current);
          }}
          type="button"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      ) : null}
    </section>
  );
}
