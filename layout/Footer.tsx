import { CameraIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../packages/ui/Avatar";
import { Flex } from "../packages/ui/Flex";
import { Heading } from "../packages/ui/Heading";
import { Link } from "../packages/ui/Link";
import { Stack } from "../packages/ui/Stack";
import { Text } from "../packages/ui/Text";
import { styled } from "../stitches.config";

const FooterContainer = styled(motion.footer, {
  display: "flex",
  ai: "center",
  jc: "center",
  my: "$4",
});

export const Footer = () => {
  return (
    <FooterContainer layoutId="footer">
      <Flex direction="row" align="center" gap="3">
        <Avatar css={{ width: 115, height: 115 }}>
          <AvatarImage src="/me.png" alt="Dai Nguyendo" />
          <AvatarFallback>DN</AvatarFallback>
        </Avatar>
        <Stack direction="vertical" space={1}>
          <Heading size="4">dai nguyendo</Heading>
          <Flex direction="row" gap="2">
            <Link href="https://github.com/dainguyendo">
              <Stack
                direction="horizontal"
                space={1}
                style={{ alignItems: "center" }}
              >
                <GitHubLogoIcon width={18} height={18} />
                <Text>github</Text>
              </Stack>
            </Link>
            <Link href="https://www.instagram.com/daisdead/">
              <Stack
                direction="horizontal"
                space={1}
                style={{ alignItems: "center" }}
              >
                <CameraIcon width={18} height={18} />
                <Text>photo</Text>
              </Stack>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </FooterContainer>
  );
};
