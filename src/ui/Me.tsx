"use client";

import { Avatar } from "@/ui/Avatar";
import {
  ColumnsIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  variant?: "default" | "avatar-only";
}

const Me = ({ variant = "default" }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar />
      {variant === "default" && (
        <div>
          <h1 className="text-rose-600 text-2xl	font-bold">dai nguyendo</h1>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/dainguyendo"
              aria-label="Github"
              passHref
            >
              <GitHubLogoIcon width={18} height={18} />
            </Link>
            <Link
              href="https://www.instagram.com/daisdead/"
              aria-label="Instagram"
              passHref
            >
              <InstagramLogoIcon width={18} height={18} />
            </Link>
            <Link href="/tracks" aria-label="Tracks" passHref>
              <ColumnsIcon width={18} height={18} />
            </Link>
            {mounted && (
              <button onClick={handleThemeSwitch}>
                {theme === "dark" ? (
                  <SunIcon width={18} height={18} />
                ) : (
                  <MoonIcon width={18} height={18} />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Me;
