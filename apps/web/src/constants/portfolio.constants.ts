import { GITHUB_USERNAME } from "@/constants/github.constants";
import { LINKEDIN_USERNAME } from "@/constants/linkedin.constants";
import { SUBSTACK_USERNAME } from "@/constants/substack.constants";
import { X_USERNAME } from "@/constants/x.constants";
import type { PortfolioContent } from "@/types/portfolio.types";

/**
 * Placeholder portfolio copy and links. Replace these values with real content
 * when publishing.
 *
 * Projects and articles are generated at build time into
 * `src/assets/data/*.generated.json`.
 */
export const PORTFOLIO: PortfolioContent = {
  name: "Dean Grant",
  socialLinks: [
    {
      channel: "github",
      href: `https://github.com/${GITHUB_USERNAME}`,
      label: "GitHub",
    },
    {
      channel: "linkedin",
      href: `https://www.linkedin.com/in/${LINKEDIN_USERNAME}`,
      label: "LinkedIn",
    },
    {
      channel: "substack",
      href: `https://substack.com/@${SUBSTACK_USERNAME}`,
      label: "Substack",
    },
    {
      channel: "x",
      href: `https://x.com/${X_USERNAME}`,
      label: "X",
    },
  ],
  tagline:
    "I work across the full technology stack, from React and TypeScript applications to APIs, distributed services, databases, and cloud infrastructure. I’m particularly interested in the challenges that come with building and scaling systems, including reliability, security, asynchronous processing, dependency management, deployment, and observability. I enjoy breaking down complex problems, understanding the trade-offs, and finding solutions that are practical to build, operate, and maintain.\n\nI believe good engineering starts with clear architecture and sound development practices. I value automation, effective tooling, and pragmatic standards that help teams move quickly without creating unnecessary complexity. The aim is simple: build software that works well today and remains maintainable as it evolves.",
};
