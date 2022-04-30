import Head from "next/head";
import * as React from "react";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const FullViewLayout: React.FC<Props> = ({ children, title = "" }) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};
export default FullViewLayout;
