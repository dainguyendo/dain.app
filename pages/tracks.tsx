import { QuestionMarkCircledIcon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import * as React from "react";
import { useQuery } from "react-query";
import { StandardLayout } from "../layout/StandardLayout";
import { usePlayPreview } from "../providers/PlayPreviewContext";
import { getRecentTracksQuery } from "../spotify/getRecentTracksQuery";
import { defaultTheme } from "../theme";
import { Button } from "../ui/Button";
import { Error } from "../ui/Error";
import { HorizontalStack } from "../ui/HorizontalStack";
import { LoadingSphere } from "../ui/LoadingSphere";
import { Text } from "../ui/Text";
import { Track } from "../ui/Track";
import { useResponsiveScreen } from "../ui/useResponsiveScreen";
import { VerticalStack } from "../ui/VerticalStack";

const variants = {
  hidden: {
    opacity: 0,
  },
  shown: {
    opacity: 1,
  },
};

export default function Tracks() {
  const [limit, setLimit] = React.useState(10);
  const { isAbove650 } = useResponsiveScreen();
  const { preview, toggle } = usePlayPreview();

  const { data: recentTracks, status } = useQuery(
    ["recent", limit],
    getRecentTracksQuery
  );

  return (
    <StandardLayout title="Recent tracks">
      <VerticalStack space={5}>
        <HorizontalStack space={3} style={{ alignItems: "center" }}>
          <a href="#help" style={{ flexGrow: 2 }}>
            <HorizontalStack space={1} style={{ alignItems: "center" }}>
              <Text color="grey600">How to use</Text>
              <QuestionMarkCircledIcon />
            </HorizontalStack>
          </a>
          <HorizontalStack space={1} style={{ alignItems: "center" }}>
            <label htmlFor="enableTrackPreview">
              <Text color="grey600">Track preview</Text>
            </label>
            <input
              id="enableTrackPreview"
              name="enableTrackPreview"
              type="checkbox"
              checked={!!preview}
              onChange={toggle}
            />
          </HorizontalStack>
          <HorizontalStack space={1} style={{ alignItems: "center" }}>
            <Text color="grey600">Limit: </Text>
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLimit(10)}
            >
              <Text>10</Text>
            </Button>
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLimit(25)}
            >
              <Text>25</Text>
            </Button>
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLimit(50)}
            >
              <Text>50</Text>
            </Button>
          </HorizontalStack>
        </HorizontalStack>
        {status === "success" && recentTracks && (
          <motion.div
            layout={true}
            style={{
              display: "grid",
              gap: defaultTheme.spacing[3],
              gridTemplateColumns: isAbove650
                ? "repeat(3, 1fr)"
                : "repeat(2, 1fr)",
              placeItems: "center",
            }}
          >
            {recentTracks.items.map((item, idx) => {
              const { track } = item;
              return (
                <motion.div
                  key={`${track.id}${idx}`}
                  initial="hidden"
                  animate="shown"
                  variants={variants}
                  transition={{
                    delay: idx * 0.05,
                  }}
                  style={{
                    position: "relative",
                  }}
                >
                  <Track
                    index={idx}
                    totalTracks={recentTracks.items.length}
                    {...item}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
        {status === "loading" && <LoadingSphere />}
        {status === "error" && <Error />}

        <VerticalStack space={1}>
          <a id="help">
            <Text
              fontWeight="bold"
              fontSize={3}
              lineHeight="heading"
              color="grey600"
            >
              Help
            </Text>
          </a>

          <div
            style={{
              display: "grid",
              gap: defaultTheme.spacing[3],
              gridTemplateColumns: isAbove650
                ? "repeat(3, 1fr)"
                : "repeat(2, 1fr)",
            }}
          >
            <VerticalStack space={1}>
              <Text fontWeight="bold">Desktop</Text>
              <Text>Hover to see track info. Click to open in Spotify.</Text>
            </VerticalStack>
            <VerticalStack space={1}>
              <Text fontWeight="bold">Touch device</Text>
              <Text>
                Tap to open in Spotify. Touch and hold to see track info.
              </Text>
            </VerticalStack>
            <VerticalStack space={1}>
              <Text fontWeight="bold">Tips for mobile</Text>
              <Text>
                For preview, while tapped, move away from track to prevent
                opening in Spotify.
              </Text>
            </VerticalStack>
          </div>
        </VerticalStack>
      </VerticalStack>
    </StandardLayout>
  );
}
