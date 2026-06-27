import favicon from "@/assets/docker-align.png";
import "@/index.css";
import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/shared/hooks/use-theme";
import { ModalContainer } from "@/shared/lib/modal";
import { cn } from "@/shared/lib/utils";
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { HomeIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

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
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent,
});

function SiteLayout({ children }: PropsWithChildren) {
  const isResume = useRouterState({
    select: (state) => state.location.pathname.startsWith("/resume"),
  });
  const { theme, gotoNextTheme } = useTheme();

  if (isResume) {
    return <>{children}</>;
  }

  return (
    <>
      <nav
        className={cn("border-border bg-background/90 z-20 w-full border-b")}
      >
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link className="text-xl font-bold tracking-tight" to="/">
            <span className="text-accent">OH</span> JIMIN
          </Link>
          <div className="flex space-x-4">
            <Link className="hover:text-accent font-medium" to="/resume">
              Resume
            </Link>
            <Link className="hover:text-accent font-medium" to="/posts">
              Posts
            </Link>
            <span className="text-muted-foreground cursor-not-allowed font-medium opacity-60">
              명예의 실패
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => gotoNextTheme()}>
            {theme === "light" ? <SunIcon className="size-5" /> : null}
            {theme === "dark" ? <MoonIcon className="size-5" /> : null}
            {theme === "system" ? <SunMoonIcon className="size-5" /> : null}
          </Button>
        </div>
      </nav>
      {children}
      <footer className="border-border bg-background/90 mt-16 w-full border-t">
        <div className="text-muted-foreground mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 py-8 text-sm">
          <div>
            <span className="font-bold">오지민</span> &copy;{" "}
            {new Date().getFullYear()} — Portfolio, Resume & Blog.
          </div>
          <div className="flex gap-3">
            <a
              className="hover:text-accent underline"
              href="https://github.com/Xeonlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="hover:text-accent underline"
              href="mailto:jimin7020@gmail.com"
            >
              jimin7020@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function notFoundComponent() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-20">
      <section className="space-y-6">
        <p className="text-3xl font-bold">
          <span className="text-accent">404</span>
        </p>
        <h1 className="text-5xl leading-tight font-bold md:text-6xl">
          길을 잃었습니다.
          <br />이 페이지는 존재하지 않습니다.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          주소가 바뀌었거나, 아직 만들어지지 않은 페이지일 수 있습니다. <br />
          허브로 돌아가서 다시 시작해 보세요.
        </p>
      </section>

      <section className="max-w-md">
        <article className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
          <HomeIcon className="text-accent inline-block size-8" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">홈으로 돌아가기</h2>
            <p className="text-muted-foreground leading-relaxed">
              포트폴리오 허브에서 Resume, Tech Blog 등을 만나보세요.
            </p>
          </div>
          <Button className="w-full" asChild variant="outline" size="lg">
            <Link to="/">바로가기</Link>
          </Button>
        </article>
      </section>
    </main>
  );
}

function RootDocument() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="color-scheme"
        >
          <MotionConfig reducedMotion="user">
            <SiteLayout>
              <Outlet />
            </SiteLayout>
            <ModalContainer />
          </MotionConfig>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
