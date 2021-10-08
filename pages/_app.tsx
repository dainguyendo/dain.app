import { IdProvider } from "@radix-ui/react-id";
import { AnimateSharedLayout } from "framer-motion";
import App from "next/app";
import * as React from "react";
import { globalCss } from "../stitches.config";

const global = globalCss({
  html: {
    scrollBehavior: "smooth",
  },
  ul: {
    listStyle: "none",
  },
  ol: {
    listStyle: "none",
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    global();
    return (
      <AnimateSharedLayout>
        <IdProvider>
          <Component {...pageProps} />
        </IdProvider>
      </AnimateSharedLayout>
    );
  }
}

export default MyApp;
