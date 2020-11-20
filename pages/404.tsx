import { motion } from "framer-motion";
import * as React from "react";
import { StandardLayout } from "../layout/StandardLayout";
import { Text } from "../ui/Text";
import { VerticalStack } from "../ui/VerticalStack";

const Custom404: React.FC = () => {
  return (
    <StandardLayout title="Dai - 404">
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
            <pre style={{ display: "inline" }}>¯\_(ツ)_/¯</pre>
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
              color="grey600"
              fontSize={2}
            >
              Not found.
            </Text>
          </VerticalStack>
        </motion.span>
      </VerticalStack>
    </StandardLayout>
  );
};

export default Custom404;
