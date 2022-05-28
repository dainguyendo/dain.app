import { AnimatePresence, motion, useCycle } from "framer-motion";
import React from "react";
import { styled } from "../../stitches.config";
import { usePrevious } from "../../ui/usePrevious";
import type { SimplifiedTrack } from "../spotify/types";
import { RecordPerspective } from "./RecordPerspective";
import { stiffSpringTransition } from "./spring";
import { TrackId } from "./TrackId";

type Props = {
  src: string | undefined;
  active: boolean;
  playing: boolean;
  track: SimplifiedTrack;
};

const WIDTH_IDLE = "10vh";
const WIDTH_PLAYING = "70vh";
const HEIGHT_IDLE = "100vh";
const HEIGHT_PLAYING = "70vh";

const StyledRecord = styled(motion.div, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const RecordHole = styled("div", {
  backgroundColor: "#FFF",
  borderRadius: "$round",
  width: "15%",
  height: "15%",
});

const variants = {
  idle: { rotate: 0 },
  spin: {
    rotate: 360,
    transition: {
      ease: "linear",
      repeat: Infinity,
      duration: 2.75,
    },
  },
  hidden: { opacity: 0 },
  faded: { opacity: 0.5 },
  visible: { opacity: 1 },
  shrink: { width: WIDTH_IDLE },
  expand: { width: WIDTH_PLAYING },

  stop: {
    opacity: [1, 0, 0],
    width: [WIDTH_PLAYING, WIDTH_PLAYING, WIDTH_IDLE],
  },
  queue: {
    opacity: [1, 1, 0],
    width: WIDTH_PLAYING,
  },
} as any;

export const Record: React.FC<Props> = ({ active, src, playing, track }) => {
  const wasPlaying = usePrevious(playing);
  const [hovering, hover] = useCycle(false, true);

  React.useEffect(() => {
    if (wasPlaying && !playing) {
      hover(0);
    }
  }, [wasPlaying, playing, hover]);

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {playing ? (
        <RecordPerspective variant="skew">
          <StyledRecord
            id={`record-${track.id}`}
            key={`record-${track.id}`}
            initial="hidden"
            animate={["visible", playing ? "spin" : "idle"]}
            exit={["idle", "stop"]}
            variants={variants}
            css={{
              height: HEIGHT_PLAYING,
              width: WIDTH_PLAYING,
              borderRadius: "$round",
              backgroundImage: `url(${src})`,
            }}
            transition={stiffSpringTransition}
          >
            <RecordHole />
          </StyledRecord>
        </RecordPerspective>
      ) : (
        <RecordPerspective variant="flat">
          <StyledRecord
            id={`record-${track.id}`}
            key={`record-${track.id}-notplaying`}
            initial={false}
            animate={["shrink", active ? "visible" : "faded"]}
            exit={["hidden", "expand"]}
            whileHover={active ? "expand" : undefined}
            onHoverStart={() => hover()}
            onHoverEnd={() => hover()}
            variants={variants}
            css={{
              height: HEIGHT_IDLE,
              width: WIDTH_IDLE,
              borderRadius: 0,
              backgroundImage: `url(${src})`,
            }}
            transition={stiffSpringTransition}
          >
            {hovering && <TrackId track={track} />}
          </StyledRecord>
        </RecordPerspective>
      )}
    </AnimatePresence>
  );
};
