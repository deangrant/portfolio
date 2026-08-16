import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import "@/styles/global.css";
import { createDocumentThemeApplicator } from "@/utils/themeApplicator";
import { createLocalThemeStorage } from "@/utils/themeStorage";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error('Root element "#root" was not found.');
}

const applicator = createDocumentThemeApplicator();
const storage = createLocalThemeStorage();

createRoot(rootElement).render(
  <StrictMode>
    <App applicator={applicator} storage={storage} />
  </StrictMode>,
);
