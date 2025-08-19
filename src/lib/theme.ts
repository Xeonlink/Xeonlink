import { createContext } from "react";
import type { Theme } from "@/components/theme-provider";

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: Omit<Theme, "system">;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
