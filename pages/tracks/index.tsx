import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import { StandardLayout } from "../../layout/StandardLayout";
import {
  formatToSimplifiedTrack,
  getRecentTracks,
  uniqueTrack,
} from "../../packages/spotify/getRecentTracks";
import { CurrentTrack } from "../../packages/ui/CurrentTrack";
import { Flex } from "../../packages/ui/Flex";
import { RecordButton } from "../../packages/ui/RecordButton";
import { RecordGalleryItem } from "../../packages/ui/RecordGalleryItem";
import { RecordPerspective } from "../../packages/ui/RecordPerspective";
import { RecordSpinning } from "../../packages/ui/RecordSpinning";
import { RecordTooltip } from "../../packages/ui/RecordTooltip";
import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "../../packages/ui/ScrollArea";
import { TracksVolumeSlider } from "../../packages/ui/TracksVolumeSlider";
import { useAudio } from "../../packages/ui/useAudio";
import { useIsomorphicLayoutEffect } from "../../packages/ui/useIsomorphicLayoutEffect";
import { useLocallyStoredVolume } from "../../packages/ui/useLocallyStoredVolume";
import { styled } from "../../stitches.config";

const Center = styled("div", {
  display: "grid",
  placeItems: "center",
});

const AbsoluteContainer = styled(motion.div, {
  bottom: "$3",
  right: "$2",
  padding: "$2",
  position: "absolute",

  backgroundColor: "rgba(255, 255, 255, .35)",
  backdropFilter: "blur(10px)",
});

export async function getServerSideProps() {
  const recentTracks = await getRecentTracks(50);
  const data = recentTracks.items
    .filter(uniqueTrack)
    .map((item) =>
      formatToSimplifiedTrack(item.track as SpotifyApi.TrackObjectFull)
    );

  return {
    props: {
      recentTracks: data,
    },
  };
}

export default function Tracks({
  recentTracks,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
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
    <StandardLayout title="🎧 Recent tracks" header={false} footer={false}>
      <div className="full-bleed">
        <ScrollArea>
          <ScrollAreaViewport>
            <Center>
              <ToggleGroupPrimitive.Root
                type="single"
                value={selectedTrack?.id}
                onValueChange={setTrackId}
                asChild
              >
                <Flex direction="row">
                  {recentTracks.map((track) => {
                    const isPlaying = selectedTrackId === track.id;

                    return (
                      <RecordButton key={track.id} track={track}>
                        <RecordTooltip key={track.id} track={track}>
                          <AnimatePresence exitBeforeEnter>
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
                        </RecordTooltip>
                      </RecordButton>
                    );
                  })}
                </Flex>
              </ToggleGroupPrimitive.Root>
            </Center>
          </ScrollAreaViewport>

          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>

          <ScrollAreaCorner />
        </ScrollArea>
      </div>

      <AbsoluteContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {audio && (
          <Flex
            direction="row"
            css={{ alignItems: "center", justifyContent: "center", gap: "$4" }}
          >
            {selectedTrack && <CurrentTrack track={selectedTrack} />}
            <TracksVolumeSlider
              volume={volume}
              onVolumeChange={(volume) => {
                setVolume(volume);
                setCacheVolume(volume);
              }}
            />
          </Flex>
        )}
      </AbsoluteContainer>
    </StandardLayout>
  );
}
