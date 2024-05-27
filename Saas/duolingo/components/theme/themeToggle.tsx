"use client";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

function ThemeToggle({ className, ...props }: ButtonProps) {
  const { isDark, toggle, hydrated } = useThemeToggle();
  // TODO: fix layout shift from hydration
  if (!hydrated) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("text-2xl", className)}
      title="Toggle theme"
      aria-label="Toggle theme"
      {...props}
      onClick={toggle}
    >
      {isDark ? (
        <Moon className="size-[1em] fill-current" />
      ) : (
        <Sun className="size-[1em] fill-current" />
      )}
    </Button>
  );
}

export default ThemeToggle;
