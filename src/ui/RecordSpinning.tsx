import { motion } from "framer-motion";
import React from "react";
import type { SimplifiedTrack } from "../spotify/types";
import { RecordHole } from "./RecordHole";
import {
  HEIGHT_PLAYING,
  recordVariants,
  WIDTH_PLAYING,
} from "./utilities/record";
import { stiffSpring } from "./utilities/transition";

// const StyledRecord = styled(motion.div, {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   height: HEIGHT_PLAYING,
//   width: WIDTH_PLAYING,
//   borderRadius: "$round",
// });

interface Props {
  active: boolean;
  track: SimplifiedTrack;
}

export const RecordSpinning = ({ track }: Props) => {
  return (
    <motion.div
      id={`record-${track.id}`}
      initial="hidden"
      animate={["visible", "spin"]}
      exit={["idle", "stop"]}
      variants={recordVariants}
      style={{
        backgroundImage: `url(${track.albumImageUrl})`,
      }}
      transition={stiffSpring}
    >
      <RecordHole />
    </motion.div>
  );
};
