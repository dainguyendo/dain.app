import { motion } from "framer-motion";
import { NextPage } from "next";
import { StandardLayout } from "../libs/ui/layout/StandardLayout";
import { Text } from "../libs/ui/Text";
import { VerticalStack } from "../libs/ui/VerticalStack";

const Error: NextPage = () => {
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
              color="muted"
              fontSize={2}
            >
              Something went wrong.
            </Text>
          </VerticalStack>
        </motion.span>
      </VerticalStack>
    </StandardLayout>
  );
};

export default Error;
