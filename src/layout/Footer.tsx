"use client";
// import { CameraIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import * as React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
// import { div } from "../ui/div";
// import { Heading } from "../ui/Heading";
// import { div } from "../ui/div";
import { Text } from "../ui/Text";
import Link from "next/link";

export const Footer = () => {
  return (
    <motion.footer layoutId="footer">
      <div>
        {/* <Avatar css={{ width: 115, height: 115 }}>
          <AvatarImage src="/me.png" alt="Dai Nguyendo" />
          <AvatarFallback>DN</AvatarFallback>
        </Avatar> */}
        <div>
          <h1>dai nguyendo</h1>
          <div>
            <Link href="https://github.com/dainguyendo" passHref>
              <div>
                {/* <GitHubLogoIcon width={18} height={18} /> */}
                <Text>github</Text>
              </div>
            </Link>
            <Link href="https://www.instagram.com/daisdead/" passHref>
              <div>
                {/* <CameraIcon width={18} height={18} /> */}
                <Text>photo</Text>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
