import favicon from "@/assets/docker-align.png";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import "@/index.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "author", content: "오지민" },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "Korean" },
      { name: "theme-color", content: "#000000" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { name: "apple-mobile-web-app-title", content: "오지민 개발자" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: favicon },
      { rel: "canonical", href: "https://portfolio.ohjimin.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
      <ThemeProvider defaultTheme="system">
        <MotionConfig reducedMotion="user">
          <Outlet />
        </MotionConfig>
      </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
