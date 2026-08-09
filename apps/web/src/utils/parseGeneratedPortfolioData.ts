import type { Article, Project } from "@/types/portfolio.types";
import {
  assertArticles,
  assertProjects,
} from "./assertGeneratedPortfolioData.mjs";

/**
 * Validates generated GitHub project JSON before the UI consumes it.
 * @param data Unknown import from `github-projects.generated.json`.
 */
export function parseProjects(data: unknown): Project[] {
  return assertProjects(data);
}

/**
 * Validates generated Substack article JSON before the UI consumes it.
 * @param data Unknown import from `substack-articles.generated.json`.
 */
export function parseArticles(data: unknown): Article[] {
  return assertArticles(data);
}
