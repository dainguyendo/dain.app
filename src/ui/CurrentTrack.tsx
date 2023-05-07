import { DiscIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React from "react";
import type { SimplifiedTrack } from "../spotify/types";

// const StyledLink = styled(motion.a, {
//   all: "unset",
//   textDecoration: "none",
//   lineHeight: 0,
//   cursor: "pointer",
// });

interface Props {
  track: SimplifiedTrack;
}

const TranslateTrack = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ overflow: "hidden", lineHeight: "normal" }}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-105%" }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 4.75,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          width: 120,
          display: "flex",
          textOverflow: "clip",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const CurrentTrack = ({ track }: Props) => {
  return (
    <motion.a
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      href={track.uri}
    >
      <div className="flex gap-1">
        <DiscIcon />
        <TranslateTrack>
          <span>{track.name}</span>
          <span>{track.artists}</span>
        </TranslateTrack>
      </div>
    </motion.a>
  );
};
