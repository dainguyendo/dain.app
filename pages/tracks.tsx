import { AnimateSharedLayout, motion } from "framer-motion";
import * as React from "react";
import { useQuery } from "react-query";
import { usePlayPreview } from "../libs/context/PlayPreviewContext";
import { useSelectedTrack } from "../libs/context/SelectedTrackContext";
import { getRecentTracks } from "../libs/queries";
import { Button } from "../libs/ui/Button";
import { Error } from "../libs/ui/Error";
import { Grid } from "../libs/ui/Grid";
import { HorizontalStack } from "../libs/ui/HorizontalStack";
import { StandardLayout } from "../libs/ui/layout/StandardLayout";
import { LoadingSphere } from "../libs/ui/LoadingSphere";
import { Text } from "../libs/ui/Text";
import { defaultTheme } from "../libs/ui/theme";
import { Track } from "../libs/ui/Track";
import { useResponsiveScreen } from "../libs/ui/useResponsiveScreen";
import { VerticalStack } from "../libs/ui/VerticalStack";

const variants = {
  hidden: {
    opacity: 0,
  },
  shown: {
    opacity: 1,
  },
};

const TracksPage: React.FC = () => {
  const [limit, setLimit] = React.useState(10);
  const { isAbove650 } = useResponsiveScreen();
  const { preview, toggle } = usePlayPreview();
  const { select } = useSelectedTrack();

  const { data: recentTracks, status } = useQuery(
    ["recent", limit],
    getRecentTracks
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
          <AnimateSharedLayout>
            <Grid
              id="tracksGrid"
              layout={true}
              gap={defaultTheme.spacing[3]}
              gridTemplateColumns={
                isAbove650 ? "repeat(3, 1fr)" : "repeat(2, 1fr)"
              }
              placeItems="center"
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
                    onMouseEnter={() => {
                      select(idx);
                    }}
                    onMouseLeave={() => {
                      select(null);
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
            </Grid>
          </AnimateSharedLayout>
        )}
        {status === "loading" && <LoadingSphere />}
        {status === "error" && <Error />}
      </VerticalStack>
    </StandardLayout>
  );
};

export default TracksPage;
