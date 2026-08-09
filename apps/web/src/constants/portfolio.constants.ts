import type { PortfolioContent } from "@/types/portfolio.types";

/**
 * Placeholder portfolio copy and links. Replace these values with real content
 * when publishing.
 */
export const PORTFOLIO: PortfolioContent = {
  articles: [
    {
      href: "https://example.substack.com/p/shipping-less",
      publishedAt: "2026-05-12",
      readTime: "6 min read",
      summary:
        "Why shrinking scope often reveals better product and architecture decisions.",
      title: "Shipping Less, Learning More",
    },
    {
      href: "https://example.substack.com/p/css-that-ages-well",
      publishedAt: "2026-03-28",
      readTime: "8 min read",
      summary:
        "A practical approach to tokens, layers, and restraint when styling long-lived apps.",
      title: "CSS That Ages Well",
    },
    {
      href: "https://example.substack.com/p/open-source-writing",
      publishedAt: "2026-01-09",
      readTime: "5 min read",
      summary:
        "How public repositories can sharpen both code taste and technical essays.",
      title: "Open Source as a Writing Habit",
    },
  ],
  name: "Dean Grant",
  projects: [
    {
      description:
        "A small command-line toolkit for inspecting and replaying HTTP traffic during local development.",
      href: "https://github.com/example/signal-cli",
      techStack: ["TypeScript", "Node.js"],
      title: "signal-cli",
    },
    {
      description:
        "Opinionated React primitives for calm, content-first marketing pages.",
      href: "https://github.com/example/paper-kit",
      techStack: ["React", "CSS Modules"],
      title: "paper-kit",
    },
    {
      description:
        "Lightweight note capture that links commits, PRs, and design decisions in one timeline.",
      href: "https://github.com/example/trace-notes",
      techStack: ["Python", "SQLite"],
      title: "trace-notes",
    },
    {
      description:
        "A tiny edge-friendly cache helper with predictable invalidation rules.",
      href: "https://github.com/example/edge-cache",
      techStack: ["TypeScript", "Cloudflare Workers"],
      title: "edge-cache",
    },
  ],
  socialLinks: [
    {
      channel: "github",
      href: "https://github.com/example",
      label: "GitHub",
    },
    {
      channel: "linkedin",
      href: "https://www.linkedin.com/in/example",
      label: "LinkedIn",
    },
    {
      channel: "substack",
      href: "https://example.substack.com",
      label: "Substack",
    },
    {
      channel: "x",
      href: "https://x.com/example",
      label: "X",
    },
    {
      channel: "email",
      href: "mailto:hello@example.com",
      label: "Email",
    },
  ],
  tagline:
    "For years I’ve enjoyed digging into complex infrastructure and data challenges. Now I’m putting that experience into building geospatial intelligence platforms designed to deliver clearer decisions from global-scale data.",
};
