import favicon from "@/assets/docker-align.png";
import "@/index.css";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

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
  notFoundComponent: () => <div>404</div>,
});

function RootDocument() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="color-scheme">
          <MotionConfig reducedMotion="user">
            <Outlet />
          </MotionConfig>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
