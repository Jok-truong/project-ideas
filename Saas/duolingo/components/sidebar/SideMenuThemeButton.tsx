"use client";

import { useThemeToggle } from "@/hooks/useThemeToggle";
import { Button, ButtonProps } from "../ui/button";
import { useTheme } from "next-themes";
function SideMenuThemeButton({ className, ...props }: ButtonProps) {
  const { setTheme } = useTheme();
  const { isDark, toggle, hydrated, theme } = useThemeToggle();

  return (
    <>
      <Button
        variant="ghost"
        className="h-auto w-full justify-start py-2 sm:max-lg:w-auto sm:max-lg:px-2"
        title="Toggle theme"
        {...props}
        onClick={toggle}
      >
        <span
          className={`flex size-10 items-center justify-center rounded-full text-3xl ${
            hydrated ? "" : "bg-loading"
          }`}
        >
          {hydrated && (isDark ? "🌛" : "🌞")}
        </span>
        <span className="ml-5 truncate sm:max-lg:sr-only">
          <span className="text-muted-foreground">Theme: </span>
          {hydrated && theme}
        </span>
      </Button>
    </>
  );
}

export default SideMenuThemeButton;
