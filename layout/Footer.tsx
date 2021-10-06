import { CameraIcon, GitHubLogoIcon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { Link } from "../packages/ui/Link";
import { Stack } from "../packages/ui/Stack";
import { Text } from "../packages/ui/Text";
import { styled } from "../stitches.config";

const ProfileImage = styled(Image, {
  clipPath: "circle(35%)",
});

const FooterContainer = styled(motion.footer, {
  my: "$4",
});

export const Footer = () => {
  return (
    <FooterContainer layoutId="footer">
      <Stack direction="horizontal" space={2} style={{ alignItems: "center" }}>
        <ProfileImage
          priority={true}
          src="/me.png"
          alt="Dai Nguyendo"
          width={225}
          height={150}
        />
        <Stack direction="vertical" space={1}>
          <Text>dai nguyendo</Text>
          <Stack direction="horizontal" space={2}>
            <Link href="https://github.com/dainguyendo">
              <Stack
                direction="horizontal"
                space={1}
                style={{ alignItems: "center" }}
              >
                <GitHubLogoIcon />
                <Text>github</Text>
              </Stack>
            </Link>
            <Link href="https://www.instagram.com/daisdead/">
              <Stack
                direction="horizontal"
                space={1}
                style={{ alignItems: "center" }}
              >
                <CameraIcon />
                <Text>photo</Text>
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </FooterContainer>
  );
};
