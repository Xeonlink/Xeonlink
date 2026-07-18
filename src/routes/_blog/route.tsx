import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/shared/hooks/use-theme";
import { cn } from "@/shared/lib/utils";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

export const Route = createFileRoute("/_blog")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme, gotoNextTheme } = useTheme();

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
      <Outlet />
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
