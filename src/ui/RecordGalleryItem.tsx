import { motion } from "framer-motion";
import React from "react";
import type { SimplifiedTrack } from "../spotify/types";
import { TrackId } from "./TrackId";
import { useHover } from "./useHover";
import { HEIGHT_IDLE, recordVariants, WIDTH_IDLE } from "./utilities/record";
import { stiffSpring } from "./utilities/transition";

interface Props {
  active: boolean;
  track: SimplifiedTrack;
}

// const StyledRecord = styled(motion.div, {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   height: HEIGHT_IDLE,
//   width: WIDTH_IDLE,
//   borderRadius: 0,
// });

export const RecordGalleryItem = ({ active, track }: Props) => {
  const [ref, hovering] = useHover<HTMLDivElement>();

  return (
    <motion.div
      id={`record-${track.id}`}
      ref={ref}
      initial={false}
      animate={["shrink", active ? "visible" : "faded"]}
      exit={["hidden", "expand"]}
      whileHover={active ? "expand" : undefined}
      variants={recordVariants}
      style={{
        backgroundImage: `url(${track.albumImageUrl})`,
      }}
      transition={stiffSpring}
    >
      {hovering && <TrackId track={track} />}
    </motion.div>
  );
};
