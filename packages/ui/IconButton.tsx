import { styled } from "../../stitches.config";

export const IconButton = styled("button", {
  // reset
  appearance: "none",
  border: "none",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",
  backgroundColor: "transparent",

  "@hover": {
    "&:hover": {
      backgroundColor: "$blackA3",
    },
  },

  "&:focus": {
    outline: "3px solid $crimson11",
  },
});
