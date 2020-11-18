import { motion } from "framer-motion";
import * as React from "react";
import { Text } from "./Text";
import { VerticalStack } from "./VerticalStack";

export const Error: React.FC = () => {
  return (
    <VerticalStack space={2}>
      <motion.span
        style={{ overflow: "hidden" }}
        initial={{ y: 26 * 1.2 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
      >
        <Text
          fontFamily="heading"
          fontWeight="bold"
          fontSize={3}
          lineHeight="heading"
        >
          ❌ <pre style={{ display: "inline" }}>404</pre>
        </Text>
      </motion.span>
      <motion.span
        style={{ overflow: "hidden" }}
        initial={{ y: -26 * 1.2 }}
        animate={{ y: 0 }}
        transition={{
          ease: "easeOut",
          duration: 0.4,
        }}
      >
        <VerticalStack space={0}>
          <Text
            fontFamily="heading"
            fontWeight="bold"
            fontSize={2}
            lineHeight="heading"
          >
            It's either you or me.
          </Text>
          <Text
            fontFamily="heading"
            fontWeight="bold"
            color="muted"
            fontSize={2}
          >
            Something went wrong.
          </Text>
        </VerticalStack>
      </motion.span>
    </VerticalStack>
  );
};
