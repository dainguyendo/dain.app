import Head from "next/head";
import * as React from "react";
import { styled } from "../stitches.config";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: boolean;
  children?: React.ReactNode;
}

const Grid = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr min(65ch, 100%) 1fr",

  "& > *": {
    gridColumn: 2,
  },
  "& > .full-bleed": {
    width: "100%",
    gridColumn: "1 / -1",
  },
  bp1: {
    padding: 0,
  },
});

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
