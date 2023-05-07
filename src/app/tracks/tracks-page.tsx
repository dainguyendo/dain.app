"use client";

import { motion, useMotionValue } from "framer-motion";
import * as React from "react";
import { RecordGalleryItem } from "@/ui/RecordGalleryItem";
import type { SimplifiedTrack } from "@/spotify/types";
import Image from "next/image";
import Link from "next/link";
// import { useLocallyStoredVolume } from "../../packages/ui/useLocallyStoredVolume";

interface Props {
  recentTracks: SimplifiedTrack[];
}

export default function Tracks({ recentTracks }: Props) {
  const [peekedTrackId, peek] = React.useState<string | null>(null);

  const peekedTrack = React.useMemo(
    () => recentTracks.find((t) => t.id === peekedTrackId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [peekedTrackId]
  );

  // const [trackId, setTrackId] = React.useState<string | null>(null);
  // const [cachedVolume, setCacheVolume] = useLocallyStoredVolume();
  // const [volume, setVolume] = React.useState(cachedVolume ?? 0.5);

  // const selectedTrack = recentTracks.find((t) => t.id === trackId);

  // const audio = useAudio(selectedTrack?.previewUrl ?? "", {
  //   volume,
  // });

  // const isATrackSelected = !!selectedTrack;
  // const selectedTrackId = selectedTrack?.id;

  let mouseX = useMotionValue(Infinity);

  // React.useEffect(() => {
  //   if (audio) {
  //     if (selectedTrackId) {
  //       audio?.play();
  //     } else {
  //       audio?.pause();
  //     }
  //   }
  // }, [audio, selectedTrackId]);

  // useIsomorphicLayoutEffect(() => {
  //   if (selectedTrackId) {
  //     const el = document.getElementById(`record-${selectedTrackId}`);
  //     if (el) {
  //       el.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //         inline: "center",
  //       });
  //     }
  //   }
  // }, [selectedTrackId]);

  return (
    <>
      <div className="full-bleed">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="mx-auto flex items-end"
        >
          {recentTracks.map((track) => {
            // const isPlaying = selectedTrackId === track.id;

            // if (isPlaying) {
            //   return (
            //     <RecordPerspective variant="skew">
            //       <RecordSpinning
            //         key={`record-${track.id}`}
            //         active={true}
            //         track={track}
            //       />
            //     </RecordPerspective>
            //   );
            // }

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
            className="flex gap-1 bg-rose-500 text-white p-4 items-center relative w-64"
            style={{
              top: -25,
              left: 25,
            }}
          >
            <Image
              src={peekedTrack.albumImageUrl}
              alt={peekedTrack.name}
              width={64}
              height={64}
            />
            <div>
              <div className="text-sm font-bold">{peekedTrack.name}</div>
              <div className="text-xs">{peekedTrack.artists}</div>
            </div>
          </motion.div>
        )}
        {/* <div className="flex flex-row flex-nowrap overflow-x-scroll">
            {recentTracks.map((track) => {
              const isPlaying = selectedTrackId === track.id;

              if (isPlaying) {
                return (
                  <RecordPerspective variant="skew">
                    <RecordSpinning
                      key={`record-${track.id}`}
                      active={true}
                      track={track}
                    />
                  </RecordPerspective>
                );
              }

              return (
                <RecordGalleryItem
                  key={`record-${track.id}-notplaying`}
                  active={isATrackSelected ? isPlaying : true}
                  track={track}
                />
              );
            })}
          </div> */}
        {/* <div>
          <ToggleGroupPrimitive.Root
            type="single"
            value={selectedTrack?.id}
            onValueChange={setTrackId}
            asChild
          >
            <div className="flex">
              {recentTracks.map((track) => {
                const isPlaying = selectedTrackId === track.id;

                return (
                  <RecordButton key={track.id} track={track}>
                    <AnimatePresence mode="wait">
                      {isPlaying ? (
                        <RecordPerspective variant="skew">
                          <RecordSpinning
                            key={`record-${track.id}`}
                            active={true}
                            track={track}
                          />
                        </RecordPerspective>
                      ) : (
                        <RecordPerspective variant="flat">
                          <RecordGalleryItem
                            key={`record-${track.id}-notplaying`}
                            active={isATrackSelected ? isPlaying : true}
                            track={track}
                          />
                        </RecordPerspective>
                      )}
                    </AnimatePresence>
                  </RecordButton>
                );
              })}
            </div>
          </ToggleGroupPrimitive.Root>
        </div> */}
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {audio && (
          <div className="flex align-center justify-center gap-4">
            {selectedTrack && <CurrentTrack track={selectedTrack} />}
            <TracksVolumeSlider
              volume={volume}
              onVolumeChange={(volume) => {
                setVolume(volume);
                setCacheVolume(volume);
              }}
            />
          </div>
        )}
      </motion.div> */}
    </>
  );
}
