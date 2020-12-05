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
  ul,ol {
    list-style: none;
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
