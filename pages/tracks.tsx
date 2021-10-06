import { motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import { StandardLayout } from "../layout/StandardLayout";
import { getRecentTracks } from "../packages/spotify/getRecentTracks";
import { Button } from "../packages/ui/Button";
import { Flex } from "../packages/ui/Flex";
import { Stack } from "../packages/ui/Stack";
import { Text } from "../packages/ui/Text";
import { Track } from "../packages/ui/Track";
import { usePlayPreview } from "../providers/PlayPreviewContext";
import { theme } from "../stitches.config";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/Dialog";
import { useResponsiveScreen } from "../ui/useResponsiveScreen";
import { listVariants } from "../ui/variants";

const trackVariants = {
  out: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
};

export async function getStaticProps() {
  const recentTracks = await getRecentTracks(50);
  return {
    props: {
      recentTracks,
    },
    revalidate: 300,
  };
}

export default function Tracks({
  recentTracks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isAbove650 } = useResponsiveScreen();
  const { preview, toggle } = usePlayPreview();

  return (
    <StandardLayout title="Recent tracks">
      <Stack space={5}>
        <Flex align="center" gap={2}>
          <div style={{ flexGrow: 2 }}>
            <Dialog>
              <DialogTrigger as={Button}>How to use</DialogTrigger>
              <DialogOverlay />
              <DialogContent style={{ padding: theme.space[3].value }}>
                <Text>Help</Text>
                <div
                  style={{
                    display: "grid",
                    gap: theme.space[3].value,
                    gridTemplateColumns: isAbove650
                      ? "repeat(3, 1fr)"
                      : "repeat(1, 1fr)",
                  }}
                >
                  <Stack space={1}>
                    <Text>Desktop</Text>
                    <Text>
                      Hover to see track info. Click to open in Spotify.
                    </Text>
                  </Stack>
                  <Stack space={1}>
                    <Text>Touch device</Text>
                    <Text>
                      Tap to open in Spotify. Touch and hold to see track info.
                    </Text>
                  </Stack>
                  <Stack space={1}>
                    <Text>Tips for mobile</Text>
                    <Text>
                      For preview, while tapped, move away from track to prevent
                      opening in Spotify.
                    </Text>
                  </Stack>
                </div>
                <DialogClose as={Button}>
                  <Text>Close</Text>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          <Stack
            direction="horizontal"
            space={1}
            style={{ alignItems: "center" }}
          >
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
          </Stack>
        </Flex>
        <motion.div
          initial="out"
          animate="in"
          variants={listVariants}
          style={{
            display: "grid",
            gap: theme.space[3].value,
            gridTemplateColumns: isAbove650
              ? "repeat(3, 1fr)"
              : "repeat(2, 1fr)",
            placeItems: "center",
          }}
        >
          {recentTracks.items.map((item, idx) => (
            <motion.div
              key={`${item.track.id}${idx}`}
              variants={trackVariants}
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
          ))}
        </motion.div>
      </Stack>
    </StandardLayout>
  );
}
