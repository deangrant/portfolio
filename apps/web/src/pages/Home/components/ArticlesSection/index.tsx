import { ArticleItem } from "@/pages/Home/components/ArticleItem";
import styles from "./index.module.css";
import type { ArticlesSectionProps } from "./index.types";

/**
 * Renders the featured Substack writing list.
 * @param props Articles from portfolio constants.
 * @returns Writing section element.
 */
export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section aria-labelledby="writing-heading" className={styles.section}>
      <h2 className={styles.title} id="writing-heading">
        Writing & Essays
      </h2>
      <ul className={styles.list}>
        {articles.map((article) => (
          <ArticleItem article={article} key={article.href} />
        ))}
      </ul>
    </section>
  );
}
