import { motion } from "framer-motion";
import Image from "next/image";
import type { SimplifiedTrack } from "../spotify/types";
import { recordVariants } from "./utilities/record";
import { stiffSpring } from "./utilities/transition";

type Size =
  | "w-0 h-0"
  | "w-1 h-1"
  | "w-2 h-2"
  | "w-3 h-3"
  | "w-4 h-4"
  | "w-5 h-5"
  | "w-6 h-6"
  | "w-7 h-7"
  | "w-8 h-8"
  | "w-9 h-9"
  | "w-10 h-10"
  | "w-11 h-11"
  | "w-12 h-12"
  | "w-14 h-14"
  | "w-16 h-16"
  | "w-20 h-20"
  | "w-24 h-24"
  | "w-28 h-28"
  | "w-32 h-32"
  | "w-36 h-36"
  | "w-40 h-40"
  | "w-44 h-44"
  | "w-48 h-48"
  | "w-52 h-52"
  | "w-56 h-56"
  | "w-60 h-60"
  | "w-64 h-64"
  | "w-72 h-72"
  | "w-80 h-80"
  | "w-96 h-96"
  | "w-auto h-auto"
  | "w-1/ h-1/2"
  | "w-1/ h-1/3"
  | "w-2/ h-2/3"
  | "w-1/ h-1/4"
  | "w-2/ h-2/4"
  | "w-3/ h-3/4"
  | "w-1/ h-1/5"
  | "w-2/ h-2/5"
  | "w-3/ h-3/5"
  | "w-4/ h-4/5"
  | "w-1/ h-1/6"
  | "w-2/ h-2/6"
  | "w-3/ h-3/6"
  | "w-4/ h-4/6"
  | "w-5/ h-5/6"
  | "w-1/12 h-1/12"
  | "w-2/12 h-2/12"
  | "w-3/12 h-3/12"
  | "w-4/12 h-4/12"
  | "w-5/12 h-5/12"
  | "w-6/12 h-6/12"
  | "w-7/12 h-7/12"
  | "w-8/12 h-8/12"
  | "w-9/12 h-9/12"
  | "w-10/12 h-10/12"
  | "w-11/12 h-11/12"
  | "w-full h-full"
  | "w-screen h-screen"
  | "w-min h-min"
  | "w-max h-max"
  | "w-fit h-fit";

interface Props {
  track: SimplifiedTrack;
  spinning: boolean;
  size: Size;
}

export const Record = ({ size, spinning, track }: Props) => {
  return (
    <motion.div
      id={`record-${track.id}`}
      initial="hidden"
      animate={spinning ? ["visible", "spin"] : "visible"}
      exit={["idle", "stop"]}
      variants={recordVariants}
      transition={stiffSpring}
      className={`flex grid place-items-center bg-no-repeat rounded-full bg-cover relative ${size}`}
    >
      <Image
        src={track.albumImageUrl}
        alt={track.name}
        fill
        className="rounded-full"
      />

      {/* Record hole */}
      <div
        className="bg-white dark:bg-slate-950 rounded-full z-10	"
        style={{ width: "15%", height: "15%" }}
      />
    </motion.div>
  );
};
