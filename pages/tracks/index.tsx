import { motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import { StandardLayout } from "../../layout/StandardLayout";
import { getRecentTracks } from "../../packages/spotify/getRecentTracks";
import { getArtists } from "../../packages/spotify/utils";
import { Button } from "../../packages/ui/Button";
import { Flex } from "../../packages/ui/Flex";
import { motionRecordRotationVariants } from "../../packages/ui/motionVariants";
import { motionRecordVariants, Record } from "../../packages/ui/Record";
import { RecordTooltip } from "../../packages/ui/RecordTooltip";
import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "../../packages/ui/ScrollArea";
import useAudio from "../../packages/ui/useAudio";
import { styled } from "../../stitches.config";

const Center = styled("div", {
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

  const isATrackSelected = !!selectedTrack;
  const selectedTrackId = selectedTrack?.track.id;

  React.useEffect(() => {
    if (selectedTrackId && audio) {
      controls.play();
    } else {
      controls.pause();
    }
  }, [audio, controls, selectedTrackId]);

  return (
    <StandardLayout footer={false}>
      {/* {isATrackSelected && (
        <Stack direction="vertical">
          <Text>now playing</Text>
          <Text>{selectedTrack.track.name}</Text>
          <Text>{getArtists(selectedTrack.track.artists)}</Text>
        </Stack>
      )} */}
      <div className="full-bleed">
        <ScrollArea>
          <ScrollAreaViewport>
            <Center>
              <Flex direction="row">
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
                            initial={"visible"}
                            animate={
                              isATrackSelected
                                ? isPlaying
                                  ? "spin"
                                  : "faded"
                                : "visible"
                            }
                          />
                        </motion.div>
                      </Button>
                    </RecordTooltip>
                  );
                })}
              </Flex>
            </Center>
            {audio}
          </ScrollAreaViewport>

          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>

          <ScrollAreaCorner />
        </ScrollArea>
      </div>
    </StandardLayout>
  );
}
