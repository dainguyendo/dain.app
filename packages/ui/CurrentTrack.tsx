import { DiscIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React from "react";
import { styled } from "../../stitches.config";
import { VisuallyHidden } from "./VisuallyHidden";

const StyledLink = styled(motion.a, {
  all: "unset",
  textDecoration: "none",
  lineHeight: 0,
});

interface Props {
  track: SpotifyApi.PlayHistoryObject;
}

export const CurrentTrack = ({ track }: Props) => {
  return (
    <StyledLink
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      href={track.track.uri}
    >
      <DiscIcon />
      <VisuallyHidden>Listen on Spotify</VisuallyHidden>
    </StyledLink>
  );
};
