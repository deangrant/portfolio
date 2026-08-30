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
    "I build across the stack: frontend applications, APIs, distributed services, databases, and cloud infrastructure. I focus on scaling systems for reliability, security, async workloads, dependencies, deployment, and observability. I break complex problems into clear trade-offs and ship solutions that are practical to build, run, and maintain.\n\nClear architecture and sound practices come first. I use automation, tooling, and pragmatic standards so teams move quickly without extra complexity. The goal is software that works today and stays maintainable as it grows.",
};
