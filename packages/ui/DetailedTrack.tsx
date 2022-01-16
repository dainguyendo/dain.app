import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import * as React from "react";
import { getArtists } from "../spotify/utils";
import { Button } from "./Button";
import { Flex } from "./Flex";
import { Heading } from "./Heading";
import { Link } from "./Link";
import {
  motionRecordRotationVariants,
  motionXTranslateAndFadeVariant,
} from "./motionVariants";
import { motionRecordVariants, Record } from "./Record";
import { Text } from "./Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import useAudio from "./useAudio";
import NextLink from "next/link";

interface Props {
  track: SpotifyApi.PlayHistoryObject;
}

export const DetailedTrack = ({ track: playHistoryObject }: Props) => {
  const { track } = playHistoryObject;

  const [audio, state, controls] = useAudio({
    src: track.preview_url ?? "",
    autoPlay: false,
  });

  React.useEffect(() => {
    if (controls) {
      controls.volume(0.2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const artists = getArtists(track.artists);

  return (
    <Flex direction="column" gap="2">
      <motion.div
        custom={{ x: 20, delay: 0.3 }}
        variants={motionXTranslateAndFadeVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <NextLink href={{ query: {} }} passHref>
          <Link>
            <Text variant="gray">back</Text>
          </Link>
        </NextLink>

        <motion.div
          custom={{ x: 10, delay: 0.2 }}
          variants={motionXTranslateAndFadeVariant}
        >
          <Heading size="2" bold variant="crimson">
            {track.name}
          </Heading>
        </motion.div>
        <motion.div
          custom={{ x: 10, delay: 0.3 }}
          variants={motionXTranslateAndFadeVariant}
        >
          <Heading size="1">{artists}</Heading>
        </motion.div>
      </motion.div>
      <div style={{ alignSelf: "center" }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="naked"
              onClick={() => {
                if (state.paused) {
                  controls.play();
                } else {
                  controls.pause();
                }
              }}
              css={{ p: 0 }}
            >
              <motion.div
                initial="flat"
                animate="skew"
                exit="flat"
                variants={motionRecordRotationVariants}
              >
                <Record
                  aria-hidden={true}
                  key={track.id}
                  layoutId={track.id}
                  src={
                    (track as SpotifyApi.TrackObjectFull).album.images[0].url
                  }
                  height={300}
                  width={300}
                  initial="idle"
                  variants={motionRecordVariants}
                  animate={state.paused ? "idle" : "spin"}
                />
              </motion.div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={5}>
            <Text bold variant="white">
              {state.paused ? "Play" : "Pause"}
            </Text>
          </TooltipContent>
        </Tooltip>
      </div>

      <motion.div
        custom={{ x: -20, delay: 0.35 }}
        variants={motionXTranslateAndFadeVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Link href={track.uri}>
          <Flex direction="row" align="center" gap="1">
            <Text css={{ color: "$spotify" }}>Spotify</Text>
            <ExternalLinkIcon width={18} height={18} />
          </Flex>
        </Link>
      </motion.div>
      {audio}
    </Flex>
  );
};
