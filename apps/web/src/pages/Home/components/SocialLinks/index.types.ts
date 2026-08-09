import type { SocialLink } from "@/types/portfolio.types";

/**
 * Props for the social and contact links row.
 */
export interface SocialLinksProps {
  /** Channels to render as icon buttons. */
  links: SocialLink[];
}
