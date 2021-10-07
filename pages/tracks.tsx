import { Cross1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import { StandardLayout } from "../layout/StandardLayout";
import { getRecentTracks } from "../packages/spotify/getRecentTracks";
import { Button } from "../packages/ui/Button";
import { Flex } from "../packages/ui/Flex";
import { Heading } from "../packages/ui/Heading";
import { Paragraph } from "../packages/ui/Paragraph";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../packages/ui/Popover";
import { Spacer } from "../packages/ui/Spacer";
import { Stack } from "../packages/ui/Stack";
import { Text } from "../packages/ui/Text";
import { Track } from "../packages/ui/Track";
import { usePlayPreview } from "../providers/PlayPreviewContext";
import { theme } from "../stitches.config";
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

const HelpPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Update dimensions">
          <Flex align="center">
            <Text>Help</Text>
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Heading size="2">Help</Heading>
        <Spacer size="2" />
        <Flex direction="column">
          <Stack space={1}>
            <Heading as="h2">Desktop</Heading>
            <Paragraph>
              Hover to see track info. Click to open in Spotify.
            </Paragraph>
          </Stack>
          <Stack space={1}>
            <Heading as="h2">Touch device</Heading>
            <Paragraph>
              Tap to open in Spotify. Touch and hold to see track info.
            </Paragraph>
          </Stack>
          <Stack space={1}>
            <Heading as="h2">Tips for mobile</Heading>
            <Paragraph>
              For preview, while tapped, move away from track to prevent opening
              in Spotify.
            </Paragraph>
          </Stack>
        </Flex>
        <PopoverClose aria-label="Close">
          <Cross1Icon />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
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
        <Flex align="center" justify="end" gap={2}>
          <HelpPopover />
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
