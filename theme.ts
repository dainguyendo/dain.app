import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  breakpoints: ["650px"],
  colors: {
    grey100: "#f3f3f3",
    grey200: "#d9d9d9",
    grey300: "#bfbfbf",
    grey400: "#a6a6a6",
    grey500: "#8d8d8d",
    grey600: "#757575",
    grey700: "#5f5f5f",
    grey800: "#494949",
    grey900: "#343434",
  },
  fonts: {
    body: "'Karla', sans-serif",
    heading: "'Karla', sans-serif",
    monospace: "'Space Mono', monospace",
  },
  fontSizes: [
    "14px",
    "16px",
    "24px",
    "36px",
    "48px",
    "64px",
    "72px",
    "96px",
    "144px",
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.8,
    heading: 1.25,
  },
  spacing: ["0", "4px", "8px", "16px", "24px", "32px", "48px", "56px", "64px"],
};
