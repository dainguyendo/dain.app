import { motion } from "framer-motion";
import styled from "styled-components";

export const Button = styled(motion.button)`
  border: none;
  border-radius: 4px;
  background-color: none;
  padding: ${(props) => props.theme.spacing[1]};

  &:hover {
    background: rgba(144, 144, 144, 0.1);
  }
`;
