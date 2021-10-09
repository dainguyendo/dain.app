import { AnimatePresence } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import { StandardLayout } from "../layout/StandardLayout";
import { getRecentTracks } from "../packages/spotify/getRecentTracks";
import { Button } from "../packages/ui/Button";
import { Grid } from "../packages/ui/Grid";
import { motionRecordVariants, Record } from "../packages/ui/Record";
import { Text } from "../packages/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../packages/ui/Tooltip";
import { TrackDialog } from "../packages/ui/TrackDialog";

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

  return (
    <StandardLayout title="Recent tracks">
      <Grid
        columns={{
          "@initial": 2,
          "@bp1": 3,
        }}
        align="center"
        justify="center"
        gap="3"
        css={{ placeItems: "center" }}
      >
        <AnimatePresence>
          {selectedTrack && (
            <TrackDialog
              playHistoryObject={selectedTrack}
              onOpenChange={(open) => {
                if (!open) {
                  selectTrack(null);
                }
              }}
            />
          )}
        </AnimatePresence>

        {recentTracks.map((item, idx) => {
          const track = item.track as SpotifyApi.TrackObjectFull;
          const albumImage = track.album.images[0];
          return (
            <Tooltip key={item.track.id}>
              <TooltipContent side="left" sideOffset={5} css={{ vs: "$1" }}>
                <Text bold variant="white" size="3">
                  {item.track.name}
                </Text>
                <Text variant="white">{item.track.artists[0].name}</Text>
              </TooltipContent>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="naked"
                  onClick={() => selectTrack(item)}
                  css={{ p: 0 }}
                >
                  <Record
                    layoutId={item.track.id}
                    src={albumImage.url}
                    height={125}
                    width={125}
                    custom={idx}
                    variants={motionRecordVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          );
        })}
      </Grid>
    </StandardLayout>
  );
}
