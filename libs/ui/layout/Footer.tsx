import * as React from "react";
import styled from "styled-components";
import { GitHubLogoIcon, ReaderIcon, CameraIcon } from "@modulz/radix-icons";
import { Text } from "../Text";
import { HorizontalStack } from "../HorizontalStack";

const FooterContainer = styled.footer`
  margin: ${(props) => props.theme.spacing[4]} 0;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Text fontWeight="bold" fontSize={3} lineHeight="heading">
        Dai Nguyendo
      </Text>
      <HorizontalStack space={2}>
        <a target="_blank" href="https://github.com/dainguyendo">
          <HorizontalStack space={1} style={{ alignItems: "center" }}>
            <GitHubLogoIcon />
            <Text>github</Text>
          </HorizontalStack>
        </a>
        <a target="_blank" href="https://dainwords.io/">
          <HorizontalStack space={1} style={{ alignItems: "center" }}>
            <ReaderIcon />
            <Text>blog</Text>
          </HorizontalStack>
        </a>
        <a target="_blank" href="https://www.instagram.com/daisdead/">
          <HorizontalStack space={1} style={{ alignItems: "center" }}>
            <CameraIcon />
            <Text>photo</Text>
          </HorizontalStack>
        </a>
      </HorizontalStack>
    </FooterContainer>
  );
};
