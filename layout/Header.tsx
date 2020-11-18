import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
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
        <Link href="/">
          <a>
            <Text fontWeight="bold">home</Text>
          </a>
        </Link>
        <Link href="/tracks">
          <a>
            <Text fontWeight="bold">tracks</Text>
          </a>
        </Link>
      </nav>
    </HeaderContainer>
  );
};
