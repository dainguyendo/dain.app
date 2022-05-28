import { motion } from "framer-motion";
import React from "react";
import { styled } from "../../stitches.config";
import { SimplifiedTrack } from "../spotify/types";
import { stiffSpringTransition } from "./spring";
import { VisuallyHidden } from "./VisuallyHidden";

const Button = styled(motion.button, {
  appearance: "none",
  border: "none",
  background: "transparent",
  padding: 0,
  outline: "none",

  "&:focus": {
    boxShadow: "0px 0px 100px 5px rgba(255,105,180,0.75)",
  },

  "&:focus:not(:focus-visible)": {
    boxShadow: "none",
  },

  "&:focus-visible": {
    boxShadow: "0px 0px 100px 5px rgba(255,105,180,0.75)",
  },
});

const variants = {
  scale: {
    scale: 1.2,
    zIndex: 2,
  },
};

interface Props extends React.ComponentProps<typeof Button> {
  track: SimplifiedTrack;
  playing: boolean;
}

// eslint-disable-next-line react/display-name
export const RecordButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, playing, track, ...props }, forwardRef) => (
    <Button
      {...props}
      ref={forwardRef}
      whileHover={!playing ? "scale" : undefined}
      whileFocus={!playing ? "scale" : undefined}
      transition={stiffSpringTransition}
      variants={variants}
    >
      {children}
      <VisuallyHidden>
        {track.name} by {track.artists}
      </VisuallyHidden>
    </Button>
  )
);
