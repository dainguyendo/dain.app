import { motion } from "framer-motion";
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

const List = styled(motion.ul)`
  display: flex;
  ${horizontalStack(2)}
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <nav>
        <List>
          <motion.li>
            <Link passHref={true} href="/">
              <Anchor>
                <Text fontWeight="bold">home</Text>
              </Anchor>
            </Link>
          </motion.li>
          <motion.li>
            <Link passHref={true} href="/tracks">
              <Anchor>
                <Text fontWeight="bold">tracks</Text>
              </Anchor>
            </Link>
          </motion.li>
          <motion.li>
            <Link passHref={true} href="/misc">
              <Anchor>
                <Text fontWeight="bold">misc</Text>
              </Anchor>
            </Link>
          </motion.li>
        </List>
      </nav>
    </HeaderContainer>
  );
};
