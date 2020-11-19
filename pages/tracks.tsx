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
    <StandardLayout title="Dai - Tracks">
      <VerticalStack space={5}>
        <HorizontalStack space={3} style={{ alignSelf: "flex-end" }}>
          <HorizontalStack space={1} style={{ alignItems: "center" }}>
            <label htmlFor="enableTrackPreview">
              <Text color="muted">Track preview</Text>
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
            <Text color="muted">Limit: </Text>
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
                  key={`${idx}-${track.id}`}
                  initial="hidden"
                  animate="shown"
                  variants={variants}
                  transition={{
                    delay: idx * 0.2,
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
      </VerticalStack>
    </StandardLayout>
  );
}
