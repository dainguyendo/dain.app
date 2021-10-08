import { motion } from "framer-motion";
import { styled } from "../../stitches.config";

export const TrackTooltip = styled(motion.div, {
  background:
    "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.75) 100%)",
  backdropFilter: "blur(4px)",
  borderRadius: "0 0 25% 25%",
  overflow: "hidden",
  p: "$1",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 1,

  top: "55%",
  left: 0,
});
