import styles from "./index.module.css";
import type { ArticleItemProps } from "./index.types";

const publishedDateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Formats an ISO date string for display using the runtime locale.
 * @param isoDate Date in `YYYY-MM-DD` form.
 * @returns Localized long-form date label.
 */
function formatPublishedDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return publishedDateFormatter.format(date);
}

/**
 * Renders one featured Substack article in the writing list.
 * @param props Article content for the row.
 * @returns Article list item.
 */
export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.meta}>
        <time dateTime={article.publishedAt}>
          {formatPublishedDate(article.publishedAt)}
        </time>
        {" · "}
        {article.readTime}
      </p>
      <p className={styles.summary}>{article.summary}</p>
      <a
        className={styles.link}
        href={article.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        Read on Substack
      </a>
    </li>
  );
}
