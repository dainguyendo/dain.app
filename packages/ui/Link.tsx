import { styled } from "../../stitches.config";

export const Link = styled("a", {
  // textDecorationColor: "$crimson11",
  // textDecorationLine: "none",
  // textDecorationThickness: "3px",
  // textUnderlineOffset: "3px",

  // "@hover": {
  //   "&:hover": {
  //     textDecorationLine: "underline",
  //   },
  // },
  // "&:focus": {
  //   outlineWidth: "0px",
  //   textDecorationLine: "underline",
  // },

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
        // outline: "none",
        // textDecorationLine: "none",
        // "@hover": {
        //   "&:hover": {
        //     outline: "none",
        //     textDecorationLine: "none",
        //   },
        // },
        // "&:focus": {
        //   outline: "none",
        //   textDecorationLine: "none",
        // },
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});
