import { QuestionMarkCircledIcon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import type { InferGetStaticPropsType } from "next";
import * as React from "react";
import styled, { useTheme } from "styled-components";
import { StandardLayout } from "../layout/StandardLayout";
import { usePlayPreview } from "../providers/PlayPreviewContext";
import { getRecentTracks } from "../packages/spotify/getRecentTracks";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/Dialog";
import { HorizontalStack } from "../ui/HorizontalStack";
import { Text } from "../ui/Text";
import { Track } from "../ui/Track";
import { useResponsiveScreen } from "../ui/useResponsiveScreen";
import { listVariants } from "../ui/variants";
import { VerticalStack } from "../ui/VerticalStack";

const trackVariants = {
  out: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
};

const Controls = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

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
  const theme = useTheme();
  const { isAbove650 } = useResponsiveScreen();
  const { preview, toggle } = usePlayPreview();

  return (
    <StandardLayout title="Recent tracks">
      <VerticalStack space={5}>
        <Controls>
          <div style={{ flexGrow: 2 }}>
            <Dialog>
              <DialogTrigger as={Button}>
                <HorizontalStack space={1} style={{ alignItems: "center" }}>
                  <Text>How to use</Text>
                  <QuestionMarkCircledIcon />
                </HorizontalStack>
              </DialogTrigger>
              <DialogOverlay />
              <DialogContent style={{ padding: theme.spacing[3] }}>
                <Text
                  fontWeight="bold"
                  fontSize={3}
                  lineHeight="heading"
                  color="grey600"
                >
                  Help
                </Text>
                <div
                  style={{
                    display: "grid",
                    gap: theme.spacing[3],
                    gridTemplateColumns: isAbove650
                      ? "repeat(3, 1fr)"
                      : "repeat(1, 1fr)",
                  }}
                >
                  <VerticalStack space={1}>
                    <Text fontWeight="bold">Desktop</Text>
                    <Text>
                      Hover to see track info. Click to open in Spotify.
                    </Text>
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
                <DialogClose as={Button}>
                  <Text>Close</Text>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
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
        </Controls>
        <motion.div
          initial="out"
          animate="in"
          variants={listVariants}
          style={{
            display: "grid",
            gap: theme.spacing[3],
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
      </VerticalStack>
    </StandardLayout>
  );
}
