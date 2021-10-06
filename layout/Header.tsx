import { motion } from "framer-motion";
import NextLink from "next/link";
import * as React from "react";
import { Link } from "../packages/ui/Link";
import { Text } from "../packages/ui/Text";
import { styled } from "../stitches.config";

const HeaderContainer = styled("header", {
  display: "flex",
  jc: "flex-end",
  my: "$4",
});

const List = styled(motion.ul, {
  display: "flex",
  hs: "$2",
});

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <nav>
        <List>
          <motion.li>
            <NextLink passHref={true} href="/">
              <Link>
                <Text>home</Text>
              </Link>
            </NextLink>
          </motion.li>
          <motion.li>
            <NextLink passHref={true} href="/tracks">
              <Link>
                <Text>tracks</Text>
              </Link>
            </NextLink>
          </motion.li>
          <motion.li>
            <NextLink passHref={true} href="/misc">
              <Link>
                <Text>misc</Text>
              </Link>
            </NextLink>
          </motion.li>
        </List>
      </nav>
    </HeaderContainer>
  );
};
