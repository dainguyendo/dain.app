import { AnimatePresence } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { StandardLayout } from "../../layout/StandardLayout";
import { getRecentTracks } from "../../packages/spotify/getRecentTracks";
import { DetailedTrack } from "../../packages/ui/DetailedTrack";
import { Grid } from "../../packages/ui/Grid";
import { TracksGallery } from "../../packages/ui/TracksGallery";

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
  const router = useRouter();

  const [
    selectedTrack,
    selectTrack,
  ] = React.useState<SpotifyApi.PlayHistoryObject | null>(null);

  if (router.query.trackId && selectedTrack) {
    return (
      <StandardLayout title="Recent tracks" footer={false}>
        <AnimatePresence>
          <DetailedTrack track={selectedTrack} />
        </AnimatePresence>
      </StandardLayout>
    );
  }

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
        <TracksGallery
          tracks={recentTracks}
          onTrackClick={(track) => {
            selectTrack(track);
            router.push({
              pathname: router.pathname,
              query: { ...router.query, trackId: track.track.id },
            });
          }}
        />
      </Grid>
    </StandardLayout>
  );
}
