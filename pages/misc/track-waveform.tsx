import { motion } from "framer-motion";
import * as React from "react";
import { useQuery } from "react-query";
import { useTheme } from "styled-components";
import { StandardLayout } from "../../layout/StandardLayout";
import { getRecentTracksQuery } from "../../spotify/getRecentTracksQuery";
import { useTrackVisualization } from "../../stores/trackVisualStore";
import { Anchor } from "../../ui/Anchor";
import { Error } from "../../ui/Error";
import { LoadingSphere } from "../../ui/LoadingSphere";
import { Record } from "../../ui/Record";
import { Text } from "../../ui/Text";
import { TrackWaveformVisual } from "../../ui/three/TrackWaveformVisual";
import { VerticalStack } from "../../ui/VerticalStack";

const TracksWaveformPage = () => {
  const theme = useTheme();
  const store = useTrackVisualization();
  const [limit] = React.useState(9);
  const { data: recentTracks, status } = useQuery(["recent", limit], () =>
    getRecentTracksQuery(limit)
  );

  React.useEffect(() => {
    if (!store.track) {
      store.audio?.pause();
    }
  });

  return (
    <StandardLayout title="Visual: Tracks Waveform">
      <VerticalStack space={5}>
        {status === "error" && <Error />}
        {status === "loading" && <LoadingSphere />}
        {status === "success" && recentTracks && (
          <VerticalStack space={3}>
            <div
              style={{
                display: "grid",
                gridGap: theme.spacing[3],
                gridTemplateColumns: "repeat(3, 1fr)",
                placeItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  zIndex: -1,
                }}
              >
                <TrackWaveformVisual track={store.track} />
              </div>
              {recentTracks.items.map((item, idx) => {
                const track = item.track;
                const { album } = track as SpotifyApi.TrackObjectFull;
                const medAlbumImage = album.images[album.images.length - 2];
                const isSelected = track.id === store.track?.id;
                return (
                  <Record
                    key={`${track.id}-${idx}`}
                    src={medAlbumImage.url}
                    height={125}
                    width={125}
                    animate={{
                      rotate: isSelected ? 360 : 0,
                      transition: {
                        ease: "linear",
                        repeat: isSelected ? Infinity : 0,
                        duration: isSelected ? 5 : 0.25,
                      },
                    }}
                    onClick={() => {
                      store.setTrack(track);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
            <motion.div layoutId="info">
              <Text
                fontWeight="bold"
                fontSize={3}
                lineHeight="heading"
                color="grey600"
              >
                Track Waveform
              </Text>
              <p>
                <Text>
                  It's been a bit since I've had any involvement with
                  visuals/visualizations.
                </Text>
              </p>
              <p>
                <Text>
                  To get back, I wanted to explore creating waveforms from
                  audio. Adding 3D was just a new twist for myself.
                </Text>
              </p>
              <Text fontWeight="bold" fontSize={1} lineHeight="heading">
                Explored:
              </Text>
              <ul>
                <VerticalStack space={1}>
                  <li>
                    <Anchor
                      target="_blank"
                      href="https://github.com/pmndrs/react-three-fiber"
                    >
                      <code>react-fiber-three</code>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor target="_blank" href="https://zustand.surge.sh/">
                      <code>zustand</code>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor
                      target="_blank"
                      href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext"
                    >
                      <code>AudioContext</code>
                    </Anchor>
                  </li>
                </VerticalStack>
              </ul>
            </motion.div>
          </VerticalStack>
        )}
      </VerticalStack>
    </StandardLayout>
  );
};

export default TracksWaveformPage;
