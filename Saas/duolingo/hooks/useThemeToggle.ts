import { useTheme } from "next-themes";
import { useCallback } from "react";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

export const useThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === THEME_DARK;

  const toggle = useCallback(() => {
    setTheme(isDark ? THEME_LIGHT : THEME_DARK);
  }, [isDark, setTheme]);

  return {
    isDark,
    toggle,
    theme: resolvedTheme,
  };
};
