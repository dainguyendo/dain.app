"use client";

import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence>{children}</AnimatePresence>
    </ThemeProvider>
  );
};

export default Providers;
