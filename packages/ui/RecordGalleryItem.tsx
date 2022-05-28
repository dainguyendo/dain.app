import { motion, useCycle } from "framer-motion";
import React from "react";
import { styled } from "../../stitches.config";
import type { SimplifiedTrack } from "../spotify/types";
import { stiffSpringTransition } from "./spring";
import { TrackId } from "./TrackId";
import { HEIGHT_IDLE, recordVariants, WIDTH_IDLE } from "./utilities/record";

interface Props {
  active: boolean;
  track: SimplifiedTrack;
}

const StyledRecord = styled(motion.div, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: HEIGHT_IDLE,
  width: WIDTH_IDLE,
  borderRadius: 0,
});

export const RecordGalleryItem = ({ active, track }: Props) => {
  const [hovering, hover] = useCycle(false, true);

  return (
    <StyledRecord
      id={`record-${track.id}`}
      initial={false}
      animate={["shrink", active ? "visible" : "faded"]}
      exit={["hidden", "expand"]}
      whileHover={active ? "expand" : undefined}
      onHoverStart={() => hover()}
      onHoverEnd={() => hover()}
      variants={recordVariants}
      css={{
        backgroundImage: `url(${track.albumImageUrl})`,
      }}
      transition={stiffSpringTransition}
    >
      {hovering && <TrackId track={track} />}
    </StyledRecord>
  );
};
