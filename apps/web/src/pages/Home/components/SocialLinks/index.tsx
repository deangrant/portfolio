import type { SocialChannel } from "@/types/portfolio.types";
import styles from "./index.module.css";
import type { SocialLinksProps } from "./index.types";

/**
 * Returns an inline SVG icon for a social channel.
 * @param channel Channel whose icon should be rendered.
 * @returns Icon element for the channel.
 */
function SocialIcon({ channel }: { channel: SocialChannel }) {
  switch (channel) {
    case "github":
      return (
        <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
            fill="currentColor"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
          <path
            d="M6.94 8.5H3.75V20h3.19V8.5zM5.34 7.05a1.85 1.85 0 1 0 0-3.7 1.85 1.85 0 0 0 0 3.7zM20.25 20h-3.18v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94V20H9.9V8.5h3.05v1.57h.04c.42-.8 1.46-1.65 3.01-1.65 3.22 0 3.25 2.12 3.25 4.88V20z"
            fill="currentColor"
          />
        </svg>
      );
    case "substack":
      return (
        <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
          <path
            d="M3.5 3.75h17v2.5h-17v-2.5zm0 5.5h17V22l-8.5-4.75L3.5 22V9.25z"
            fill="currentColor"
          />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
          <path
            d="M14.7 10.35 21.2 3h-1.55l-5.66 6.38L9.47 3H3.5l6.83 9.65L3.5 21h1.55l5.97-6.73L14.53 21h5.97l-5.8-10.65zm-2.11 2.38-.69-.96L5.6 4.17h2.37l4.45 6.18.69.96 5.84 8.1h-2.37l-4.99-6.68z"
            fill="currentColor"
          />
        </svg>
      );
    case "email":
      return (
        <svg
          aria-hidden="true"
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <rect height="14" rx="2" width="18" x="3" y="5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}

/**
 * Renders a scannable row of social and contact links.
 * @param props Link data from portfolio constants.
 * @returns Social links navigation list.
 */
export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <nav aria-label="Social and contact links">
      <ul className={styles.list}>
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");

          return (
            <li key={link.channel}>
              <a
                className={styles.link}
                href={link.href}
                {...(isExternal
                  ? { rel: "noopener noreferrer", target: "_blank" }
                  : {})}
              >
                <SocialIcon channel={link.channel} />
                <span className={styles.label}>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
