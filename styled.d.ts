import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: string[];
    colors: {
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;
      grey900: string;
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
