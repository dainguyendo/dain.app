import { styled } from "../../stitches.config";

export const Spacer = styled("div", {
  display: "block",

  variants: {
    direction: {
      vertical: {},
      horizontal: {},
    },
    size: {
      "1": {},
      "2": {},
      "3": {},
      "4": {},
      "5": {},
      "6": {},
      "7": {},
      "8": {},
      "9": {},
    },
  },

  compoundVariants: [
    {
      direction: "vertical",
      size: "1",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$1",
        minHeight: "$space$1",
      },
    },
    {
      direction: "vertical",
      size: "2",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$2",
        minHeight: "$space$2",
      },
    },
    {
      direction: "vertical",
      size: "3",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$3",
        minHeight: "$space$3",
      },
    },
    {
      direction: "vertical",
      size: "4",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$4",
        minHeight: "$space$4",
      },
    },
    {
      direction: "vertical",
      size: "5",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$5",
        minHeight: "$space$5",
      },
    },
    {
      direction: "vertical",
      size: "6",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$6",
        minHeight: "$space$6",
      },
    },
    {
      direction: "vertical",
      size: "7",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$7",
        minHeight: "$space$7",
      },
    },
    {
      direction: "vertical",
      size: "8",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$8",
        minHeight: "$space$8",
      },
    },
    {
      direction: "vertical",
      size: "9",
      css: {
        width: "1px",
        minWidth: "1px",
        height: "$space$9",
        minHeight: "$space$9",
      },
    },
    {
      direction: "horizontal",
      size: "1",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$1",
        minWidth: "$space$1",
      },
    },
    {
      direction: "horizontal",
      size: "2",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$2",
        minWidth: "$space$2",
      },
    },
    {
      direction: "horizontal",
      size: "3",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$3",
        minWidth: "$space$3",
      },
    },
    {
      direction: "horizontal",
      size: "4",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$4",
        minWidth: "$space$4",
      },
    },
    {
      direction: "horizontal",
      size: "5",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$5",
        minWidth: "$space$5",
      },
    },
    {
      direction: "horizontal",
      size: "6",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$6",
        minWidth: "$space$6",
      },
    },
    {
      direction: "horizontal",
      size: "7",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$7",
        minWidth: "$space$7",
      },
    },
    {
      direction: "horizontal",
      size: "8",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$8",
        minWidth: "$space$8",
      },
    },
    {
      direction: "horizontal",
      size: "9",
      css: {
        height: "1px",
        minHeight: "1px",
        width: "$space$9",
        minWidth: "$space$9",
      },
    },
  ],

  defaultVariants: {
    direction: "vertical",
  },
});
