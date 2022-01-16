import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import * as React from "react";
import FullViewLayout from "../../layout/FullViewLayout";
import { getRecentTracks } from "../../packages/spotify/getRecentTracks";
import { getArtists } from "../../packages/spotify/utils";
import { Button } from "../../packages/ui/Button";
import { Flex } from "../../packages/ui/Flex";
import { Grid } from "../../packages/ui/Grid";
import { Heading } from "../../packages/ui/Heading";
import { Link } from "../../packages/ui/Link";
import {
  motionRecordRotationVariants,
  motionXTranslateAndFadeVariant,
} from "../../packages/ui/motionVariants";
import { motionRecordVariants, Record } from "../../packages/ui/Record";
import { Text } from "../../packages/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../packages/ui/Tooltip";
import { styled } from "../../stitches.config";
import { useTrackVisualization } from "../../stores/trackVisualStore";
import { TrackWaveformVisual } from "../../ui/three/TrackWaveformVisual";

export async function getStaticProps() {
  const recentTracks = await getRecentTracks(9);
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

const TrackWaveformVisualContainer = styled("div", { size: "100%" });
const SelectedTitleContainer = styled(motion.div, {
  padding: "$2",
  position: "absolute",
  textAlign: "right",
  top: 0,
  right: 0,
  "@bp1": {
    padding: 0,
    top: "5%",
    right: "5%",
  },
});
const ControlsContainer = styled(motion.div, {
  padding: "$2",
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  "@bp1": {
    padding: 0,
    bottom: "5%",
    left: "5%",
    width: "max-content",
  },
});

const TracksWaveformPage = ({
  recentTracks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { audio, track: selectedTrack, setTrack } = useTrackVisualization();

  React.useEffect(() => {
    if (!selectedTrack) {
      audio?.pause();
    }
  });

  return (
    <FullViewLayout title="track-waveform">
      <AnimatePresence>
        <TrackWaveformVisualContainer>
          <TrackWaveformVisual track={selectedTrack} />
        </TrackWaveformVisualContainer>

        {selectedTrack && (
          <SelectedTitleContainer
            key="title-container"
            custom={{ x: -20, delay: 0.3 }}
            variants={motionXTranslateAndFadeVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            css={{
              vs: "$1",
            }}
          >
            <Heading variant="crimson" bold size="4">
              {selectedTrack.name}
            </Heading>
            <Heading size="3">{getArtists(selectedTrack.artists)}</Heading>
          </SelectedTitleContainer>
        )}

        <ControlsContainer key="controls-container" css={{ vs: "$2" }}>
          {selectedTrack ? (
            <motion.div
              initial="flat"
              animate="skew"
              exit="flat"
              variants={motionRecordRotationVariants}
            >
              <Button
                variant="naked"
                type="button"
                onClick={() => setTrack(selectedTrack)}
                css={{ p: 0 }}
              >
                <Record
                  aria-hidden={true}
                  key={selectedTrack.id}
                  layoutId={selectedTrack.id}
                  src={
                    (selectedTrack as SpotifyApi.TrackObjectFull).album
                      .images[0].url
                  }
                  height={300}
                  width={300}
                  initial="idle"
                  variants={motionRecordVariants}
                  animate="spin"
                />
              </Button>
            </motion.div>
          ) : (
            <Grid
              columns="3"
              gap={{
                "@initial": "2",
                "@bp1": "3",
              }}
              css={{ placeItems: "center" }}
            >
              {recentTracks.map((item, idx) => {
                const track = item.track;
                const { album } = track as SpotifyApi.TrackObjectFull;
                const albumImage = album.images[0];
                return (
                  <Tooltip key={`${track.id}-${idx}`}>
                    <TooltipContent
                      side="left"
                      sideOffset={5}
                      css={{ vs: "$1" }}
                    >
                      <Text bold variant="white" size="3">
                        {track.name}
                      </Text>
                      <Text variant="white">{getArtists(track.artists)}</Text>
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="naked"
                        onClick={() => setTrack(track)}
                        css={{ p: 0 }}
                      >
                        <Record
                          layoutId={track.id}
                          src={albumImage.url}
                          height={100}
                          width={100}
                        />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                );
              })}
            </Grid>
          )}
          <NextLink href="/misc" passHref>
            <Link>
              <Flex direction="row" align="center">
                <ArrowLeftIcon width={18} height={18} />
                <Text>back</Text>
              </Flex>
            </Link>
          </NextLink>
          <Heading>track waveform</Heading>
        </ControlsContainer>
      </AnimatePresence>
    </FullViewLayout>
  );
};

export default TracksWaveformPage;
