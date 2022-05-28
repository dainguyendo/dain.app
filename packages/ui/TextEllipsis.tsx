import { motion } from "framer-motion";
import { styled } from "../../stitches.config";

export const TextEllipsis = styled(motion.span, {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});
