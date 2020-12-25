import Head from "next/head";
import * as React from "react";
import styled from "styled-components";

const FullView = styled.div`
  height: 100vh;
  width: 100vw;
`;

interface Props {
  title?: string;
}

const FullViewLayout: React.FC<Props> = ({ children, title = "" }) => {
  return (
    <FullView>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </FullView>
  );
};
export default FullViewLayout;
