"use client";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

export const useThemeToggle = () => {
  const [hydrated, setHydrated] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isDark = resolvedTheme === THEME_DARK;

  const toggle = useCallback(() => {
    setTheme(isDark ? THEME_LIGHT : THEME_DARK);
  }, [isDark, setTheme]);

  return {
    isDark,
    toggle,
    theme: resolvedTheme,
    hydrated,
  };
};
