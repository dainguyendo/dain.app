"use client";

import { SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  return (
    <button
      type="button"
      className="absolute top-0 right-0 z-50 w-10 h-10 bg-white dark:bg-slate-950"
      onClick={() => {
        console.log("clicked");
        // setTheme(theme === "dark" ? "light" : "dark");
        setTheme("light");
      }}
    >
      click meeee
      <SunIcon />
    </button>
  );
};
