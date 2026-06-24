import { ThemeProviderContext, type Theme } from "@/shared/lib/theme";
import { useEffect, useMemo, useState } from "react";

export type { Theme };

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, defaultTheme = "system", storageKey = "color-scheme", ...rest } = props;

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored) {
      setTheme(stored);
    }
    setMounted(true);
  }, [storageKey]);

  const resolvedTheme = useMemo(() => {
    if (theme === "system") {
      if (typeof window === "undefined") {
        return "light" as const;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    return theme;
  }, [theme]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, mounted]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme);
      setTheme(nextTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...rest} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
