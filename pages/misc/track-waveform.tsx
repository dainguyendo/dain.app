import { ArrowLeftIcon } from "@modulz/radix-icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { useQuery } from "react-query";
import { useTheme } from "styled-components";
import FullViewLayout from "../../layout/FullViewLayout";
import { getRecentTracksQuery } from "../../spotify/getRecentTracksQuery";
import { useTrackVisualization } from "../../stores/trackVisualStore";
import Absolute from "../../ui/Absolute";
import { Error } from "../../ui/Error";
import { LoadingSphere } from "../../ui/LoadingSphere";
import { Record } from "../../ui/Record";
import { Row } from "../../ui/Row";
import { Text } from "../../ui/Text";
import { TrackWaveformVisual } from "../../ui/three/TrackWaveformVisual";
import { listItemVariants } from "../../ui/variants";
import { VerticalStack } from "../../ui/VerticalStack";

const TracksWaveformPage = () => {
  const theme = useTheme();
  const { audio, track: selectedTrack, setTrack } = useTrackVisualization();
  const [limit] = React.useState(9);
  const { data: recentTracks, status } = useQuery(["recent", limit], () =>
    getRecentTracksQuery(limit)
  );

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

      <Absolute style={{ top: "2.5%", right: "5%", textAlign: "right" }}>
        {selectedTrack && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              variants={listItemVariants}
            >
              <VerticalStack space={0}>
                <Text fontSize={3} fontWeight="bold">
                  {selectedTrack.name}
                </Text>
                <Text fontSize={2}>{selectedTrack.artists[0].name}</Text>
              </VerticalStack>
            </motion.div>
          </AnimatePresence>
        )}
      </Absolute>

      <Absolute style={{ bottom: "2.5%", left: "5%" }}>
        <VerticalStack space={2}>
          {status === "error" && <Error />}
          {status === "loading" && <LoadingSphere />}
          {status === "success" && recentTracks && (
            <div
              style={{
                display: "grid",
                gridGap: theme.spacing[3],
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
          )}

          <Link href="/misc">
            <a>
              <Row alignItems="center">
                <ArrowLeftIcon />
                <Text>back</Text>
              </Row>
            </a>
          </Link>
          <Text
            fontWeight="bold"
            fontSize={3}
            lineHeight="heading"
            color="grey600"
          >
            track waveform
          </Text>
        </VerticalStack>
      </Absolute>
    </FullViewLayout>
  );
};

export default TracksWaveformPage;
