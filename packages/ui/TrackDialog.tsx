import type { DialogProps } from "@radix-ui/react-dialog";
import { Cross1Icon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import * as React from "react";
import { styled } from "../../stitches.config";
import { Button } from "./Button";
import { Dialog, DialogClose, DialogContent } from "./Dialog";
import { Flex } from "./Flex";
import { Heading } from "./Heading";
import { IconButton } from "./IconButton";
import { Link } from "./Link";
import {
  motionRecordRotationVariants,
  motionXTranslateAndFadeVariant,
  motionYTranslateAndFadeVariant,
} from "./motionVariants";
import { motionRecordVariants, Record } from "./Record";
import { Text } from "./Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import useAudio from "./useAudio";

const TransparentDialogContent = styled(DialogContent, {
  backgroundColor: "$whiteA1",
  padding: 0,
});

const Content = styled(motion.div, {
  backgroundColor: "$whiteA11",
  borderRadius: "$2",
  padding: "$4",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$2",
});

const Top = styled(motion.div, {
  alignSelf: "flex-start",
});

const Bottom = styled(motion.div, {
  alignSelf: "flex-end",
});

const CloseIcon = styled(Cross1Icon, {
  color: "$gray12",
});

interface Props {
  playHistoryObject: SpotifyApi.PlayHistoryObject;
  onOpenChange: DialogProps["onOpenChange"];
}

export const TrackDialog: React.FC<Props> = ({
  playHistoryObject,
  onOpenChange,
}) => {
  const [audio, state, controls] = useAudio({
    src: playHistoryObject.track.preview_url ?? "",
    autoPlay: false,
  });

  React.useEffect(() => {
    if (controls) {
      controls.volume(0.2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={!!playHistoryObject} onOpenChange={onOpenChange}>
      <TransparentDialogContent forceMount={true}>
        <Content
          layoutId="track-dialog-content"
          custom={{ y: 50 }}
          initial="hidden"
          animate="visible"
          variants={motionYTranslateAndFadeVariant}
        >
          <DialogClose asChild>
            <IconButton
              aria-label="Close"
              css={{
                position: "absolute",
                top: "25px",
                right: "25px",
              }}
            >
              <CloseIcon width={18} height={18} />
            </IconButton>
          </DialogClose>

          <Top
            custom={{ x: 20, delay: 0.3 }}
            variants={motionXTranslateAndFadeVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              custom={{ x: 10, delay: 0.1 }}
              variants={motionXTranslateAndFadeVariant}
            >
              <Text css={{ color: "$gray11", textDecoration: "underline" }}>
                track
              </Text>
            </motion.div>
            <motion.div
              custom={{ x: 10, delay: 0.2 }}
              variants={motionXTranslateAndFadeVariant}
            >
              <Heading size="4" bold variant="crimson">
                {playHistoryObject.track.name}
              </Heading>
            </motion.div>
            <motion.div
              custom={{ x: 10, delay: 0.3 }}
              variants={motionXTranslateAndFadeVariant}
            >
              <Heading size="3">
                {playHistoryObject.track.artists[0].name}
              </Heading>
            </motion.div>
          </Top>

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
                    key={playHistoryObject.track.id}
                    layoutId={playHistoryObject.track.id}
                    src={
                      (playHistoryObject.track as SpotifyApi.TrackObjectFull)
                        .album.images[0].url
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

          <Bottom
            custom={{ x: -20, delay: 0.35 }}
            variants={motionXTranslateAndFadeVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Link href={playHistoryObject.track.uri}>
              <Flex direction="row" align="center" gap="1">
                <Text bold size="4" css={{ color: "$spotify" }}>
                  Spotify
                </Text>
                <ExternalLinkIcon width={18} height={18} />
              </Flex>
            </Link>
          </Bottom>
          {audio}
        </Content>
      </TransparentDialogContent>
    </Dialog>
  );
};
