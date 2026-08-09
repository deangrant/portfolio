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
 * `src/data/*.generated.json`.
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
    {
      channel: "email",
      href: "mailto:hello@example.com",
      label: "Email",
    },
  ],
  tagline:
    "For years I’ve enjoyed digging into complex infrastructure and data challenges. Now I’m putting that experience into building geospatial intelligence platforms designed to deliver clearer decisions from global-scale data.",
};
