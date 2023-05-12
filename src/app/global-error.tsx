"use client";

import Me from "@/ui/Me";
import { banner, text } from "@/ui/utilities/variants";
import { motion } from "framer-motion";
import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className={karla.className}>
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="grow flex items-center justify-center">
            <Me variant="avatar-only" />
          </div>
          <motion.div
            initial="verticalHidden"
            animate="verticalVisible"
            variants={banner}
            exit={{ opacity: 0 }}
            transition={{
              when: "beforeChildren",
              duration: 0.5,
              ease: "easeOut",
              delayChildren: 1,
            }}
            className="flex gap-1 bg-rose-600 text-white py-8 items-center relative w-64 h-full truncate"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={text}
                className="text-5xl font-bold truncate"
              >
                Uh oh.
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={text}
                className="text-4xl truncate"
              >
                {error.message}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
