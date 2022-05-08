import { HTMLMotionProps, motion } from "framer-motion";
import { styled } from "../../stitches.config";

type Props = HTMLMotionProps<"div"> & {
  height: React.CSSProperties["height"];
  width: React.CSSProperties["width"];
  src: string | undefined;
};

const StyledRecord = styled(motion.div, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
});

const RecordHole = styled("div", {
  backgroundColor: "#FFF",
  borderRadius: "$round",
  width: "15%",
  height: "15%",
});

export const motionRecordVariants = {
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
  visible: (idx: number) => ({
    opacity: 1,
    transition: {
      delay: idx * 0.1,
    },
  }),
};

export const Record: React.FC<Props> = ({
  height,
  width,
  src,
  ...motionProps
}) => {
  const animate = motionProps.animate;
  const isSpinning = animate === "spin";

  return (
    <StyledRecord
      {...motionProps}
      css={{
        height: isSpinning ? height : "100vh",
        width: isSpinning ? width : "10vh",
        borderRadius: isSpinning ? "$round" : 0,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {isSpinning && <RecordHole />}
    </StyledRecord>
  );
};
