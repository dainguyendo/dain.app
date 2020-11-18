import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  breakpoints: ["650px"],
  colors: {
    text: "hsl(0,0%,15.69%)",
    background: "hsl(0,0%,93.33%)",
    primary: "hsl(0,0%,7.45%)",
    secondary: "hsl(0,0%,34.9%)",
    muted: "hsl(0,0%,75.29%)",
  },
  fonts: {
    body: "'Lato', sans-serif",
    heading: "'Roboto', sans-serif",
    monospace: "'Roboto Mono', monospace",
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
