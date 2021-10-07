import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import * as React from "react";
import FullViewLayout from "../../layout/FullViewLayout";
import { getRecentTracks } from "../../packages/spotify/getRecentTracks";
import { Flex } from "../../packages/ui/Flex";
import { Heading } from "../../packages/ui/Heading";
import { Link } from "../../packages/ui/Link";
import { Record } from "../../packages/ui/Record";
import { Stack } from "../../packages/ui/Stack";
import { Text } from "../../packages/ui/Text";
import { theme } from "../../stitches.config";
import { useTrackVisualization } from "../../stores/trackVisualStore";
import { TrackWaveformVisual } from "../../ui/three/TrackWaveformVisual";
import { listItemVariants } from "../../ui/variants";

export async function getStaticProps() {
  const recentTracks = await getRecentTracks(9);
  return {
    props: {
      recentTracks,
    },
    revalidate: 300,
  };
}

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
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TrackWaveformVisual track={selectedTrack} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "2.5%",
          right: "5%",
          textAlign: "right",
        }}
      >
        {selectedTrack && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              variants={listItemVariants}
            >
              <Stack space={1}>
                <Heading size="4">{selectedTrack.name}</Heading>
                <Heading size="4">{selectedTrack.artists[0].name}</Heading>
              </Stack>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div style={{ position: "absolute", bottom: "2.5%", left: "5%" }}>
        <Stack space={2}>
          <div
            style={{
              display: "grid",
              gridGap: theme.space[3].value,
              gridTemplateColumns: "repeat(3, 1fr)",
              placeItems: "center",
            }}
          >
            {recentTracks.items.map((item, idx) => {
              const track = item.track;
              const { album } = track as SpotifyApi.TrackObjectFull;
              const medAlbumImage = album.images[album.images.length - 2];
              const isSelected = track.id === selectedTrack?.id;
              return (
                <Record
                  key={`${track.id}-${idx}`}
                  src={medAlbumImage.url}
                  height={100}
                  width={100}
                  animate={{
                    opacity: selectedTrack && !isSelected ? 0.2 : 1,
                    rotate: isSelected ? 360 : 0,
                    transition: {
                      ease: "linear",
                      repeat: isSelected ? Infinity : 0,
                      duration: isSelected ? 5 : 0.25,
                    },
                  }}
                  onClick={() => {
                    setTrack(track);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <NextLink href="/misc" passHref>
            <Link>
              <Flex direction="row" align="center">
                <ArrowLeftIcon />
                <Text>back</Text>
              </Flex>
            </Link>
          </NextLink>
          <Heading>track waveform</Heading>
        </Stack>
      </div>
    </FullViewLayout>
  );
};

export default TracksWaveformPage;
