import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import React from "react";
import { SimplifiedTrack } from "../spotify/types";
// import { VisuallyHidden } from "./VisuallyHidden";

// const Button = styled(ToggleGroupPrimitive.Item, {
//   appearance: "none",
//   border: "none",
//   background: "transparent",
//   curosr: "pointer",
//   padding: 0,
//   outline: "none",

//   "&:focus": {
//     boxShadow: "0px 0px 100px 5px rgba(255,105,180,0.75)",
//   },

//   "&:focus:not(:focus-visible)": {
//     boxShadow: "none",
//   },

//   "&:focus-visible": {
//     boxShadow: "0px 0px 100px 5px rgba(255,105,180,0.75)",
//   },
// });

interface Props {
  track: SimplifiedTrack;
  children: React.ReactNode;
}

const RecordButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, track }, forwardRef) => (
    <ToggleGroupPrimitive.Item ref={forwardRef} value={track.id}>
      {children}
      <span className="sr-only">
        {track.name} by {track.artists}
      </span>
    </ToggleGroupPrimitive.Item>
  )
);

RecordButton.displayName = "RecordButton";

export { RecordButton };
