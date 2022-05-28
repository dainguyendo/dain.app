import React from "react";
import { SimplifiedTrack } from "../spotify/types";
import { styled } from "../../stitches.config";
import { motion, Variants } from "framer-motion";
import { Text } from "./Text";
import { stiffSpringTransition } from "./spring";
import { TextEllipsis } from "./TextEllipsis";

interface Props {
  track: SimplifiedTrack;
}

const Container = styled(motion.div, {
  position: "absolute",
  top: 0,
  left: 0,
  background: "$crimson11",
  padding: "$4",
  textAlign: "initial",
  maxWidth: "100%",
});

const containerVariants: Variants = {
  exit: { x: -100, opacity: 0 },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      ...stiffSpringTransition,
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
    <Container
      layoutId={`track-id-${track.id}`}
      initial="exit"
      animate="enter"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div variants={content} transition={stiffSpringTransition}>
        <TextEllipsis>
          <Text bold variant="white" size="6">
            {track.name}
          </Text>
        </TextEllipsis>
      </motion.div>
      <motion.div variants={content} transition={stiffSpringTransition}>
        <TextEllipsis>
          <Text variant="white" size="2">
            {track.artists}
          </Text>
        </TextEllipsis>
      </motion.div>
    </Container>
  );
};
