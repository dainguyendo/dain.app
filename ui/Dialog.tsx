import * as RadixDialog from "@radix-ui/react-dialog";
import { styled } from "../stitches.config";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogOverlay = styled(RadixDialog.Overlay, {
  backgroundColor: "$gray1",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});
export const DialogContent = styled(RadixDialog.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "200px",
  maxWidth: "fit-content",
  maxHeight: "85vh",
  marginTop: "-5vh",
  backgroundColor: "$gray1",
  borderRadius: "$2",
  "&:focus": {
    outline: "none",
  },
});
export const DialogClose = RadixDialog.Close;
