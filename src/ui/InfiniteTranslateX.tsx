import { motion } from "framer-motion";
import React from "react";

export const InfiniteTranslateX = ({
  width = "auto",
  children,
}: {
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
}) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "-105%" }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 4.75,
        ease: "linear",
        repeat: Infinity,
      }}
      className="text-clip whitespace-nowrap"
      style={{
        width,
      }}
    >
      {children}
    </motion.div>
  );
};
