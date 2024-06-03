"use client";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "../ui/button";
import { useEffect, useState } from "react";
function SideMenuThemeButton({ className, ...props }: ButtonProps) {
  const { theme, setTheme } = useTheme();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="h-auto w-full justify-start py-2 sm:max-lg:w-auto sm:max-lg:px-2"
        title="Toggle theme"
        {...props}
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        <span
          className={`flex size-10 items-center justify-center rounded-full text-3xl ${
            hydrated ? "" : "bg-loading"
          }`}
        >
          {hydrated && (theme === "dark" ? "🌛" : "🌞")}
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
