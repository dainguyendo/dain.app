import Head from "next/head";
import * as React from "react";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: boolean;
}

const Grid = styled.main`
  display: grid;
  padding: 0 ${(props) => props.theme.spacing[2]};

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

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: 0;
  }
`;

export const StandardLayout: React.FC<Props> = ({
  children,
  title = "",
  footer = true,
  ...rest
}) => {
  return (
    <Grid {...rest}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      {footer && <Footer />}
    </Grid>
  );
};
