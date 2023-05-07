"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import {
  AnimatePresence,
  motion,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import * as React from "react";

import { CurrentTrack } from "@/ui/CurrentTrack";
import { RecordButton } from "@/ui/RecordButton";
import { RecordGalleryItem } from "@/ui/RecordGalleryItem";
import { RecordPerspective } from "@/ui/RecordPerspective";
import { RecordSpinning } from "@/ui/RecordSpinning";
import { RecordTooltip } from "@/ui/RecordTooltip";
// import {
//   ScrollArea,
//   ScrollAreaCorner,
//   ScrollAreaScrollbar,
//   ScrollAreaThumb,
//   ScrollAreaViewport,
// } from "../../packages/ui/ScrollArea";
import { TracksVolumeSlider } from "@/ui/TracksVolumeSlider";

import { useLocallyStoredVolume } from "@/ui/useLocallyStoredVolume";
import { useAudio } from "@/ui/useAudio";
import type { SimplifiedTrack } from "@/spotify/types";
// import { useLocallyStoredVolume } from "../../packages/ui/useLocallyStoredVolume";
// import { styled } from "../../stitches.config";

// const Center = styled("div", {
//   display: "grid",
//   placeItems: "center",
// });

// const AbsoluteContainer = styled(motion.div, {
//   bottom: "$3",
//   right: "$2",
//   padding: "$2",
//   position: "absolute",

//   backgroundColor: "rgba(255, 255, 255, .35)",
//   backdropFilter: "blur(10px)",
// });

interface Props {
  recentTracks: SimplifiedTrack[];
}

export default function Tracks({ recentTracks }: Props) {
  const [trackId, setTrackId] = React.useState<string | null>(null);
  const [cachedVolume, setCacheVolume] = useLocallyStoredVolume();
  const [volume, setVolume] = React.useState(cachedVolume ?? 0.5);

  const selectedTrack = recentTracks.find((t) => t.id === trackId);

  const audio = useAudio(selectedTrack?.previewUrl ?? "", {
    volume,
  });

  const isATrackSelected = !!selectedTrack;
  const selectedTrackId = selectedTrack?.id;

  React.useEffect(() => {
    if (audio) {
      if (selectedTrackId) {
        audio?.play();
      } else {
        audio?.pause();
      }
    }
  }, [audio, selectedTrackId]);

  useIsomorphicLayoutEffect(() => {
    if (selectedTrackId) {
      const el = document.getElementById(`record-${selectedTrackId}`);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [selectedTrackId]);

  return (
    <>
      <div className="full-bleed">
        <div>
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
        </div>
      </div>

      <motion.div
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
      </motion.div>
    </>
  );
}
