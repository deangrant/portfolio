import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Vite config for the web app: React plugin and `@` → `src` path alias.
 * Base is `/` for local preview and the custom domain (deangrant.me).
 */
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
