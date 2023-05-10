"use client";

import { Avatar } from "@/ui/Avatar";
import {
  ColumnsIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export const Me = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar />
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
        </div>
      </div>
    </div>
  );
};
