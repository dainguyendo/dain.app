"use client";

import type { SimplifiedTrack } from "@/spotify/types";
import { RecordGalleryItem } from "@/ui/RecordGalleryItem";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
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
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex gap-1 bg-rose-600 text-white py-8 items-center relative w-64 h-full truncate"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          <div>
            <div className="text-5xl font-bold truncate">
              {peekedTrack.name}
            </div>
            <div className="text-4xl truncate">{peekedTrack.artists}</div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Tracks;
