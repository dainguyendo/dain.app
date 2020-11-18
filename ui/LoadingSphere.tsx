import { Half2Icon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import * as React from "react";
import { Text } from "./Text";
import { VerticalStack } from "./VerticalStack";

export const LoadingSphere = () => {
  return (
    <VerticalStack
      space={1}
      style={{ justifyContent: "center", alignItems: "center" }}
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
        css={{
          width: 50,
          height: 50,
        }}
      >
        <Half2Icon width={50} height={50} />
      </motion.div>
      <Text fontWeight="bold">Loading ...</Text>
    </VerticalStack>
  );
};
