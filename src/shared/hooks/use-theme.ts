import { useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark" | "system";

const nextThemeMapper: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const nextTheme = nextThemeMapper[theme as Theme];

  const gotoNextTheme = () => {
    setTheme(nextThemeMapper[theme as Theme]);
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    nextTheme,
    gotoNextTheme,
  };
}
