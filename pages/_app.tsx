import { AnimateSharedLayout } from "framer-motion";
import App from "next/app";
import * as React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { PlayPreviewProvider } from "../providers/PlayPreviewContext";
import { defaultTheme } from "../theme";

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  * {
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.body};
  }
  h1 {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: ${(props) => props.theme.lineHeights.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    font-size: ${(props) => props.theme.fontSizes[6]};
  }
  h2 {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: ${(props) => props.theme.lineHeights.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    font-size: ${(props) => props.theme.fontSizes[5]};
  }
  h3 {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: ${(props) => props.theme.lineHeights.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    font-size: ${(props) => props.theme.fontSizes[4]};
  }
  h4 {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: ${(props) => props.theme.lineHeights.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    font-size: ${(props) => props.theme.fontSizes[3]};
  }
  h5 {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: ${(props) => props.theme.lineHeights.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    font-size: ${(props) => props.theme.fontSizes[2]};
  }
  h6 {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: ${(props) => props.theme.lineHeights.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    font-size: ${(props) => props.theme.fontSizes[1]};
  }
  p {
    color: ${(props) => props.theme.colors.grey900};
    font-family: ${(props) => props.theme.fonts.body};
    line-height: ${(props) => props.theme.lineHeights.body};
    font-weight: ${(props) => props.theme.fontWeights.body};
    font-size: ${(props) => props.theme.fontSizes[1]};
  }
  a {
    color: ${(props) => props.theme.colors.grey100};
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: ${(props) => props.theme.fontWeights.body};
  }
  pre {
    font-family: ${(props) => props.theme.fonts.monospace};
  }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <PlayPreviewProvider>
            <AnimateSharedLayout>
              <Component {...pageProps} />
            </AnimateSharedLayout>
          </PlayPreviewProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
