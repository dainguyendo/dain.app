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
            gridTemplateColumns="repeat(3, 1fr)"
            gap={defaultTheme.spacing[2]}
          >
            <Text
              fontSize={2}
              lineHeight="heading"
              fontWeight="bold"
              style={{
                gridColumn: "1 / 3",
                gridRow: "1 / 3",
                placeSelf: "center",
              }}
            >
              Recent tracks on Spotify:
            </Text>
            {recentTracks.items.map((item, idx) => {
              const { track } = item;
              return <Track key={`${idx}-${track.id}`} {...item} />;
            })}
          </Grid>
        )}
        {status === "loading" && <Pulse />}
      </VerticalStack>
    </StandardLayout>
  );
};

export default MusicPage;
