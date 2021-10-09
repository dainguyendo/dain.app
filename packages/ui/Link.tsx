import { styled } from "../../stitches.config";

export const Link = styled("a", {
  variants: {
    variant: {
      default: {
        textDecorationColor: "$crimson11",
        textDecorationLine: "none",
        textDecorationThickness: "3px",
        textUnderlineOffset: "3px",

        "@hover": {
          "&:hover": {
            textDecorationLine: "underline",
          },
        },
        "&:focus": {
          outlineWidth: "0px",
          textDecorationLine: "underline",
        },
      },
      empty: {
        textDecoration: "none",
        "&:focus": {
          outline: "3px solid $colors$crimson11",
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});
