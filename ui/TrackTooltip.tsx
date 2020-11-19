import { motion } from "framer-motion";
import styled from "styled-components";

interface Props {
  rect: DOMRect;
}

export const TrackTooltip = styled(motion.div)<Props>`
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.75) 100%
  );

  backdrop-filter: blur(4px);
  border-radius: 0 0 25% 25%;
  overflow: hidden;
  padding: ${(props) => props.theme.spacing[1]};
  pointer-events: none;
  position: absolute;

  top: 55%;
  left: 0;

  height: ${(props) => props.rect.height / 2}px;
  width: ${(props) => props.rect.width - 8}px;
  z-index: 1;
`;
