import { styled } from "../../stitches.config";

export const Text = styled("span", {
  // reset
  margin: 0,
  fontFamily: "$untitled",
  fontWeight: 400,

  variants: {
    size: {
      "1": {
        fontSize: "$1",
      },
      "2": {
        fontSize: "$2",
      },
      "3": {
        fontSize: "$3",
      },
      "4": {
        fontSize: "$4",
      },
      "5": {
        fontSize: "$5",
      },
      "6": {
        fontSize: "$6",
      },
      "7": {
        fontSize: "$7",
      },
      "8": {
        fontSize: "$8",
      },
      "9": {
        fontSize: "$9",
      },
    },
    variant: {
      crimson: { color: "$crimson11" },
      pink: { color: "$pink11" },
      gray: { color: "$gray12" },
      white: { color: "$gray1" },
    },
    bold: {
      true: {
        fontWeight: 700,
      },
    },
  },

  defaultVariants: {
    size: "2",
    variant: "gray",
    bold: false,
  },
});
