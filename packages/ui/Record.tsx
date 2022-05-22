import { AnimatePresence, motion } from "framer-motion";
import { styled } from "../../stitches.config";
import type { SimplifiedTrack } from "../spotify/types";

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
      duration: 2,
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
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {playing ? (
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
        >
          <RecordHole />
        </StyledRecord>
      ) : (
        <StyledRecord
          id={`record-${track.id}`}
          key={`record-${track.id}-notplaying`}
          initial="visible"
          animate={active ? "visible" : "faded"}
          exit={["hidden", "expand"]}
          variants={variants}
          css={{
            height: HEIGHT_IDLE,
            width: WIDTH_IDLE,
            borderRadius: 0,
            backgroundImage: `url(${src})`,
          }}
        />
      )}
    </AnimatePresence>
  );
};
