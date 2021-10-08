import { styled } from "../../stitches.config";

export const Stack = styled("div", {
  variants: {
    direction: {
      vertical: {
        display: "flex",
        flexDirection: "column",
      },
      horizontal: {
        display: "flex",
        flexDirection: "row",
      },
    },
    space: {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
    },
  },
  compoundVariants: [
    {
      direction: "vertical",
      space: 1,
      css: {
        "& > * + *": { marginTop: "$1" },
      },
    },
    {
      direction: "vertical",
      space: 2,
      css: {
        "& > * + *": { marginTop: "$2" },
      },
    },
    {
      direction: "vertical",
      space: 3,
      css: {
        "& > * + *": { marginTop: "$3" },
      },
    },
    {
      direction: "vertical",
      space: 4,
      css: {
        "& > * + *": { marginTop: "$4" },
      },
    },
    {
      direction: "vertical",
      space: 5,
      css: {
        "& > * + *": { marginTop: "$5" },
      },
    },
    {
      direction: "vertical",
      space: 6,
      css: {
        "& > * + *": { marginTop: "$6" },
      },
    },
    {
      direction: "vertical",
      space: 7,
      css: {
        "& > * + *": { marginTop: "$7" },
      },
    },
    {
      direction: "vertical",
      space: 8,
      css: {
        "& > * + *": { marginTop: "$8" },
      },
    },
    {
      direction: "vertical",
      space: 9,
      css: {
        "& > * + *": { marginTop: "$9" },
      },
    },
    {
      direction: "horizontal",
      space: 1,
      css: {
        "& > * + *": { marginLeft: "$1" },
      },
    },
    {
      direction: "horizontal",
      space: 2,
      css: {
        "& > * + *": { marginLeft: "$2" },
      },
    },
    {
      direction: "horizontal",
      space: 3,
      css: {
        "& > * + *": { marginLeft: "$3" },
      },
    },
    {
      direction: "horizontal",
      space: 4,
      css: {
        "& > * + *": { marginLeft: "$4" },
      },
    },
    {
      direction: "horizontal",
      space: 5,
      css: {
        "& > * + *": { marginLeft: "$5" },
      },
    },
    {
      direction: "horizontal",
      space: 6,
      css: {
        "& > * + *": { marginLeft: "$6" },
      },
    },
    {
      direction: "horizontal",
      space: 7,
      css: {
        "& > * + *": { marginLeft: "$7" },
      },
    },
    {
      direction: "horizontal",
      space: 8,
      css: {
        "& > * + *": { marginLeft: "$8" },
      },
    },
    {
      direction: "horizontal",
      space: 9,
      css: {
        "& > * + *": { marginLeft: "$9" },
      },
    },
  ],
  defaultVariants: {
    direction: "vertical",
  },
});
