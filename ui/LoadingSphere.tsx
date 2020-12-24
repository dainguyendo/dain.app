import { Half2Icon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import * as React from "react";
import { VerticalStack } from "./VerticalStack";

export const LoadingSphere: React.FC<{
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <VerticalStack
      space={1}
      style={{ justifyContent: "center", alignItems: "center", ...style }}
    >
      <motion.div
        animate={{
          rotateX: [0, 360, 0],
          rotateY: [0, 360, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
        }}
        style={{
          width: 50,
          height: 50,
        }}
      >
        <Half2Icon width={50} height={50} />
      </motion.div>
      {children}
    </VerticalStack>
  );
};
