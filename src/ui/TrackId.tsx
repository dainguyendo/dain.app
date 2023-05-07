import React from "react";
import { SimplifiedTrack } from "../spotify/types";
import { motion, Variants } from "framer-motion";
import { Text } from "./Text";
import { stiffSpring } from "./utilities/transition";
import { TextEllipsis } from "./TextEllipsis";

interface Props {
  track: SimplifiedTrack;
}

const containerVariants: Variants = {
  exit: { x: -100, opacity: 0 },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      ...stiffSpring,
      delayChildren: 0.25,
      staggerChildren: 0.1,
    },
  },
};

const content: Variants = {
  exit: { y: 50, opacity: 0 },
  enter: { y: 0, opacity: 1 },
};

export const TrackId = ({ track }: Props) => {
  return (
    <>
      <motion.div variants={content} transition={stiffSpring}>
        <TextEllipsis>
          <span>{track.name}</span>
        </TextEllipsis>
      </motion.div>
      <motion.div variants={content} transition={stiffSpring}>
        <TextEllipsis>
          <span>{track.artists}</span>
        </TextEllipsis>
      </motion.div>
    </>
  );
};
