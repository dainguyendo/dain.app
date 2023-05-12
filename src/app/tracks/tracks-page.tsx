"use client";

import type { SimplifiedTrack } from "@/spotify/types";
import { RecordGalleryItem } from "@/ui/RecordGalleryItem";
import { banner, text } from "@/ui/utilities/variants";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import * as React from "react";

interface Props {
  recentTracks: SimplifiedTrack[];
}

const Tracks = ({ recentTracks }: Props) => {
  const [peekedTrackId, peek] = React.useState<string | null>(null);

  const peekedTrack = React.useMemo(
    () => recentTracks.find((t) => t.id === peekedTrackId),
    [peekedTrackId, recentTracks]
  );

  let mouseX = useMotionValue(Infinity);

  return (
    <>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex items-end full-bleed overflow-x-scroll"
      >
        {recentTracks.map((track) => {
          return (
            <Link key={track.id} href={`/tracks/${track.id}`} passHref>
              <RecordGalleryItem
                key={`record-${track.id}-notplaying`}
                track={track}
                mouseX={mouseX}
                active
                onHoverStart={peek}
                onHoverEnd={() => peek(null)}
              />
            </Link>
          );
        })}
      </motion.div>
      {peekedTrack && (
        <motion.div
          initial="verticalHidden"
          animate="verticalVisible"
          exit="verticalHidden"
          variants={banner}
          transition={{ duration: 0.3, ease: "easeOut", delayChildren: 0.5 }}
          className="flex gap-1 bg-rose-600 text-white py-8 items-center relative w-64 h-full truncate"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={text}
              className="text-5xl font-bold truncate"
            >
              {peekedTrack.name}
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={text}
              className="text-4xl truncate"
            >
              {peekedTrack.artists}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Tracks;
