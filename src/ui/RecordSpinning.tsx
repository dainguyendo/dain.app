import { motion } from "framer-motion";
import Image from "next/image";
import type { SimplifiedTrack } from "../spotify/types";
import { recordVariants } from "./utilities/record";
import { stiffSpring } from "./utilities/transition";

interface Props {
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
      transition={stiffSpring}
      className="flex grid place-items-center bg-no-repeat rounded-full bg-cover w-32 h-32 relative"
    >
      <Image
        src={track.albumImageUrl}
        alt={track.name}
        fill
        className="rounded-full"
      />

      {/* Record hole */}
      <div
        className="bg-white rounded-full z-10	"
        style={{ width: "15%", height: "15%" }}
      />
    </motion.div>
  );
};
