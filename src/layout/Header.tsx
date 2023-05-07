"use client";

import { LinkText } from "@/ui/LinkText";
import { motion } from "framer-motion";
import Link from "next/link";
import NextLink from "next/link";
import * as React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-end px-4 py-6">
      <nav>
        <ul className="flex gap-2 justify-end">
          <motion.li>
            <NextLink passHref href="/">
              <LinkText>home</LinkText>
            </NextLink>
          </motion.li>
          <motion.li>
            <NextLink passHref href="/tracks">
              <LinkText>tracks</LinkText>
            </NextLink>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
};
