import { motion } from "framer-motion";
import React from "react";
import { styled } from "../../stitches.config";
import type { SimplifiedTrack } from "../spotify/types";
import { RecordHole } from "./RecordHole";
import { stiffSpringTransition } from "./spring";
import {
  HEIGHT_PLAYING,
  recordVariants,
  WIDTH_PLAYING,
} from "./utilities/record";

const StyledRecord = styled(motion.div, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: HEIGHT_PLAYING,
  width: WIDTH_PLAYING,
  borderRadius: "$round",
});

interface Props {
  active: boolean;
  track: SimplifiedTrack;
}

export const RecordSpinning = ({ track }: Props) => {
  return (
    <StyledRecord
      id={`record-${track.id}`}
      initial="hidden"
      animate={["visible", "spin"]}
      exit={["idle", "stop"]}
      variants={recordVariants}
      css={{
        backgroundImage: `url(${track.albumImageUrl})`,
      }}
      transition={stiffSpringTransition}
    >
      <RecordHole />
    </StyledRecord>
  );
};
