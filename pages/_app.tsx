import { IdProvider } from "@radix-ui/react-id";
import App from "next/app";
import * as React from "react";
import { globalCss } from "../stitches.config";

const global = globalCss({
  "*": {
    boxSizing: "border-box",
  },
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
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    );
  }
}

export default MyApp;
