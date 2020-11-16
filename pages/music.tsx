import { motion } from "framer-motion";
import * as React from "react";
import { useQuery } from "react-query";
import { getRecentTracks } from "../libs/queries";
import { Grid } from "../libs/ui/Grid";
import { HorizontalStack } from "../libs/ui/HorizontalStack";
import { StandardLayout } from "../libs/ui/layout/StandardLayout";
import { Pulse } from "../libs/ui/Pulse";
import { Text } from "../libs/ui/Text";
import { defaultTheme } from "../libs/ui/theme";
import { Track } from "../libs/ui/Track";
import { VerticalStack } from "../libs/ui/VerticalStack";

const variants = {
  hidden: {
    opacity: 0,
  },
  shown: {
    opacity: 1,
  },
};

const MusicPage: React.FC = () => {
  const [limit, setLimit] = React.useState(10);

  const { data: recentTracks, status } = useQuery(
    ["recent", limit],
    getRecentTracks
  );

  return (
    <StandardLayout title="Dai - Music">
      <VerticalStack space={3}>
        <HorizontalStack space={1} style={{ alignSelf: "flex-end" }}>
          <Text color="muted">Limit: </Text>
          <button onClick={() => setLimit(10)}>
            <Text>10</Text>
          </button>
          <button onClick={() => setLimit(25)}>
            <Text>25</Text>
          </button>
          <button onClick={() => setLimit(50)}>
            <Text>50</Text>
          </button>
        </HorizontalStack>
        {status === "success" && recentTracks && (
          <Grid
            id="tracksGrid"
            gap={defaultTheme.spacing[3]}
            gridTemplateColumns="repeat(3, 1fr)"
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
        )}
        {status === "loading" && <Pulse />}
      </VerticalStack>
    </StandardLayout>
  );
};

export default MusicPage;
