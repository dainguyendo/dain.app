import { motion } from "framer-motion";
import * as React from "react";
import { StandardLayout } from "../layout/StandardLayout";
import { Stack } from "../packages/ui/Stack";
import { Text } from "../packages/ui/Text";

const Custom404: React.FC = () => {
  return (
    <StandardLayout title="Dai - 404">
      <Stack space={2}>
        <motion.span
          style={{ overflow: "hidden" }}
          initial={{ y: 26 * 1.2 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        >
          <Text>
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
          <Stack space={1}>
            <Text>Not found.</Text>
          </Stack>
        </motion.span>
      </Stack>
    </StandardLayout>
  );
};

export default Custom404;
