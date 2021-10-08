import { styled } from "../../stitches.config";

export const Button = styled("button", {
  border: "none",
  borderRadius: "$1",
  cursor: "pointer",

  p: "$1",
  fontFamily: "$untitled",
  fontSize: "$2",
  fontWeight: 700,

  "&:focus": {
    outline: "1px solid $colors$crimson11",
  },

  "&:focus:not(:focus-visible)": {
    outline: "none",
  },

  "&:focus-visible": {
    outline: "1px solid $colors$crimson11",
  },

  variants: {
    variant: {
      default: {},
      naked: {
        border: "none",
        background: "transparent",
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});
