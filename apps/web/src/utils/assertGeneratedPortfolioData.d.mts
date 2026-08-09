import type { Article, Project } from "@/types/portfolio.types";

/**
 * Validates mapped project output before writing or rendering generated JSON.
 * @param data Candidate project list.
 */
export function assertProjects(data: unknown): Project[];

/**
 * Validates mapped article output before writing or rendering generated JSON.
 * @param data Candidate article list.
 */
export function assertArticles(data: unknown): Article[];
