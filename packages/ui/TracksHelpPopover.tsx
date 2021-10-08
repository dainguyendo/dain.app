import { Cross1Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { Button } from "./Button";
import { Flex } from "./Flex";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./Popover";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";
import { Text } from "./Text";

export const TracksHelpPopover = () => {
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
