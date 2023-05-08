"use client";

import { Avatar } from "@/ui/Avatar";
import { CameraIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const Me = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar />
      <div>
        <h1>dai nguyendo</h1>
        <div>
          <Link href="https://github.com/dainguyendo" passHref>
            <div className="flex items-center gap-1">
              <GitHubLogoIcon width={18} height={18} />
              <span>github</span>
            </div>
          </Link>
          <Link href="https://www.instagram.com/daisdead/" passHref>
            <div className="flex items-center gap-1">
              <CameraIcon width={18} height={18} />
              <span>photo</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
