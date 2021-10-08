import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { keyframes, styled } from "../../stitches.config";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backdropFilter: "blur(20px)",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const Root: React.FC<DialogPrimitive.DialogProps> = ({
  children,
  ...props
}) => {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay forceMount={true} className="overlay" />
      {children}
    </DialogPrimitive.Root>
  );
};

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "$4",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 1000ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: "transform",
  },
  "&:focus": { outline: "none" },
});

const StyledTitle = styled(DialogPrimitive.Title, {});

const StyledDescription = styled(DialogPrimitive.Description, {});

// Exports
export const Dialog = Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = StyledContent;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;
