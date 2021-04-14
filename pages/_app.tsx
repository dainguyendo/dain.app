import { IdProvider } from "@radix-ui/react-id";
import { AnimateSharedLayout } from "framer-motion";
import App from "next/app";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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

const queryClient = new QueryClient();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <PlayPreviewProvider>
            <AnimateSharedLayout>
              <IdProvider>
                <Component {...pageProps} />
              </IdProvider>
            </AnimateSharedLayout>
          </PlayPreviewProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
