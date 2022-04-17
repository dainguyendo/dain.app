import { motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import { getRecentTracks } from "../../packages/spotify/getRecentTracks";
import { getArtists } from "../../packages/spotify/utils";
import { Button } from "../../packages/ui/Button";
import { Flex } from "../../packages/ui/Flex";
import { motionRecordRotationVariants } from "../../packages/ui/motionVariants";
import { motionRecordVariants, Record } from "../../packages/ui/Record";
import { RecordTooltip } from "../../packages/ui/RecordTooltip";
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "../../packages/ui/ScrollArea";
import useAudio from "../../packages/ui/useAudio";
import { styled } from "../../stitches.config";

const PageScrollArea = styled(ScrollArea, {
  width: "100vw",
  height: "100vh",
});

const PageScrollAreaViewport = styled(ScrollAreaViewport, {
  height: "100vh",
  width: "100vw",
  display: "grid",
  placeItems: "center",
});

export async function getStaticProps() {
  const recentTracks = await getRecentTracks(50);
  // Remove duplicate recent tracks based on track ID
  const uniqueRecentTracks = recentTracks.items.filter(
    (item, idx, self) =>
      idx === self.findIndex((t) => t.track.id === item.track.id)
  );

  return {
    props: {
      recentTracks: uniqueRecentTracks,
    },
    revalidate: 300,
  };
}

export default function Tracks({
  recentTracks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [
    selectedTrack,
    selectTrack,
  ] = React.useState<SpotifyApi.PlayHistoryObject | null>(null);

  const [audio, _state, controls] = useAudio({
    src: selectedTrack?.track.preview_url ?? "",
    autoPlay: false,
  });

  const selectedTrackId = selectedTrack?.track.id;

  React.useEffect(() => {
    if (selectedTrackId && audio) {
      controls.play();
    } else {
      controls.pause();
    }
  }, [audio, controls, selectedTrackId]);

  return (
    <PageScrollArea>
      <PageScrollAreaViewport>
        <Flex direction="row" gap="4">
          {recentTracks.map((item, idx) => {
            const track = item.track as SpotifyApi.TrackObjectFull;
            const albumImage = track.album.images[0];

            const isPlaying = selectedTrackId === track.id;

            return (
              <RecordTooltip
                key={item.track.id}
                trackName={item.track.name}
                trackArtists={getArtists(item.track.artists)}
              >
                <Button
                  type="button"
                  variant="naked"
                  onClick={() => {
                    selectTrack(isPlaying ? null : item);
                  }}
                  css={{ p: 0 }}
                >
                  <motion.div
                    initial="flat"
                    animate={isPlaying ? "skew" : "flat"}
                    variants={motionRecordRotationVariants}
                  >
                    <Record
                      layoutId={item.track.id}
                      src={albumImage.url}
                      height={"70vh"}
                      width={"70vh"}
                      custom={idx}
                      variants={motionRecordVariants}
                      initial={false}
                      animate={isPlaying ? "spin" : "visible"}
                    />
                  </motion.div>
                </Button>
              </RecordTooltip>
            );
          })}
        </Flex>
        {audio}
      </PageScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </PageScrollArea>
  );
}
