import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { horizontalStack } from "../HorizontalStack";

interface Props {
  title?: string;
}

const Grid = styled.main`
  display: grid;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;

  & > * {
    grid-column: 2;
  }

  & > .full-bleed {
    width: 100%;
    grid-column: 1 / 4;
  }
`;

export const StandardLayout: React.FC<Props> = ({ children, title = "" }) => {
  return (
    <Grid>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav
          css={`
            ${horizontalStack(2)}
          `}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/music">
            <a>Music</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Grid>
  );
};
