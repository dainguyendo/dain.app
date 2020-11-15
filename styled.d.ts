import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: string;
      background: string;
      primary: string;
      secondary: string;
      muted: string;
    };
    fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
    fontSizes: Array<string>;
    fontWeights: {
      body: number;
      heading: number;
      bold: number;
    };
    lineHeights: {
      body: number;
      heading: number;
    };
    spacing: Array<string>;
  }
}
