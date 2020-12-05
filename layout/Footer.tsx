import { CameraIcon, GitHubLogoIcon } from "@modulz/radix-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import styled from "styled-components";
import { Anchor } from "../ui/Anchor";
import { HorizontalStack } from "../ui/HorizontalStack";
import { Text } from "../ui/Text";
import { VerticalStack } from "../ui/VerticalStack";

const ProfileImage = styled(Image)`
  clip-path: circle(35%);
`;

const FooterContainer = styled(motion.footer)`
  margin: ${(props) => props.theme.spacing[4]} 0;
`;

export const Footer = () => {
  return (
    <FooterContainer layoutId="footer">
      <HorizontalStack space={2} style={{ alignItems: "center" }}>
        <ProfileImage
          priority={true}
          src="/me.png"
          alt="Dai Nguyendo"
          width={225}
          height={150}
        />
        <VerticalStack space={1}>
          <Text fontWeight="bold" fontSize={3} lineHeight="heading">
            dai nguyendo
          </Text>
          <HorizontalStack space={2}>
            <Anchor target="_blank" href="https://github.com/dainguyendo">
              <HorizontalStack space={1} style={{ alignItems: "center" }}>
                <GitHubLogoIcon />
                <Text>github</Text>
              </HorizontalStack>
            </Anchor>
            <Anchor target="_blank" href="https://www.instagram.com/daisdead/">
              <HorizontalStack space={1} style={{ alignItems: "center" }}>
                <CameraIcon />
                <Text>photo</Text>
              </HorizontalStack>
            </Anchor>
          </HorizontalStack>
        </VerticalStack>
      </HorizontalStack>
    </FooterContainer>
  );
};
