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
  const ref = React.useRef<HTMLDivElement>(null);
  const [hoveringNearEnd, setHoveringNearEnd] = React.useState(false);
  const [peekedTrackId, peek] = React.useState<string | null>(null);
  const peekedTrack = React.useMemo(
    () => recentTracks.find((t) => t.id === peekedTrackId),
    [peekedTrackId, recentTracks]
  );

  let mouseX = useMotionValue(Infinity);

  return (
    <main
      className={`flex ${
        hoveringNearEnd ? "flex-col" : "flex-col md:flex-row"
      } items-center justify-center w-screen h-screen relative`}
    >
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex items-end full-bleed overflow-x-scroll"
        onWheel={(e) => {
          if (ref.current) {
            ref.current.scrollLeft += e.deltaY;
          }
        }}
      >
        {recentTracks.map((track, idx) => {
          const nearEnd = idx > recentTracks.length - 4;
          return (
            <Link key={track.id} href={`/tracks/${track.id}`} passHref>
              <RecordGalleryItem
                key={`record-${track.id}-notplaying`}
                track={track}
                mouseX={mouseX}
                active
                onHoverStart={(id) => {
                  setHoveringNearEnd(nearEnd);
                  peek(id);
                }}
                onHoverEnd={() => peek(null)}
              />
            </Link>
          );
        })}
      </motion.div>
      {hoveringNearEnd && peekedTrack && (
        <motion.div
          layoutId="peeked-track"
          initial="verticalHidden"
          animate="verticalVisible"
          exit="verticalHidden"
          variants={banner}
          transition={{ duration: 0.3, ease: "easeOut", delayChildren: 0.5 }}
          className="flex gap-1 bg-rose-600 text-white p-4 md:p-8 items-center w-full truncate writing-mode-horizontal absolute bottom-0"
          style={{
            textOrientation: "mixed",
          }}
        >
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={text}
              className="text-lg md:text-5xl font-bold truncate"
            >
              {peekedTrack.name}
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={text}
              className="text-md md:text-4xl truncate"
            >
              {peekedTrack.artists}
            </motion.div>
          </div>
        </motion.div>
      )}
      {!hoveringNearEnd && peekedTrack && (
        <motion.div
          layoutId="peeked-track"
          initial="verticalHidden"
          animate="verticalVisible"
          exit="verticalHidden"
          variants={banner}
          transition={{ duration: 0.3, ease: "easeOut", delayChildren: 0.5 }}
          className="absolute bottom-0 md:right-0 flex gap-1 bg-rose-600 text-white py-4 px-4 md:py-12 md:px-0 items-center w-full md:w-64 md:h-full truncate writing-mode-horizontal md:writing-mode-vertical"
          style={{
            textOrientation: "mixed",
          }}
        >
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={text}
              className="text-lg md:text-5xl font-bold truncate"
            >
              {peekedTrack?.name}
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={text}
              className="text-md md:text-4xl truncate"
            >
              {peekedTrack?.artists}
            </motion.div>
          </div>
        </motion.div>
      )}
    </main>
  );
};
export default Tracks;
