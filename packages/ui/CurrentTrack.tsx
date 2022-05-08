import { DiscIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React from "react";
import { styled } from "../../stitches.config";
import { getArtists } from "../spotify/utils";
import { Flex } from "./Flex";
import { Spacer } from "./Spacer";
import { Text } from "./Text";

const StyledLink = styled(motion.a, {
  all: "unset",
  textDecoration: "none",
  lineHeight: 0,
  cursor: "pointer",
});

interface Props {
  track: SpotifyApi.PlayHistoryObject;
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
    <StyledLink
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      href={track.track.uri}
    >
      <Flex gap="1">
        <DiscIcon />
        <TranslateTrack>
          <Text bold css={{ fontSize: "$1", color: "$pink11" }}>
            {track.track.name}
          </Text>
          <Spacer direction="horizontal" size="1" />
          <Text css={{ fontSize: "$1" }}>
            {getArtists(track.track.artists)}
          </Text>
        </TranslateTrack>
      </Flex>
    </StyledLink>
  );
};
