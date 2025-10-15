import { MotionConfig } from "motion/react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(rootElement);

root.render(
  <ThemeProvider defaultTheme="system">
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </ThemeProvider>,
);
