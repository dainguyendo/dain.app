import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { Anchor } from "../ui/Anchor";
import { horizontalStack } from "../ui/HorizontalStack";
import { Text } from "../ui/Text";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  margin: ${(props) => props.theme.spacing[4]} 0;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <nav
        css={`
          ${horizontalStack(2)}
        `}
      >
        <Link passHref={true} href="/">
          <Anchor>
            <Text fontWeight="bold">home</Text>
          </Anchor>
        </Link>
        <Link passHref={true} href="/tracks">
          <Anchor>
            <Text fontWeight="bold">tracks</Text>
          </Anchor>
        </Link>
        <Link passHref={true} href="/words">
          <Anchor>
            <Text fontWeight="bold">words</Text>
          </Anchor>
        </Link>
      </nav>
    </HeaderContainer>
  );
};
