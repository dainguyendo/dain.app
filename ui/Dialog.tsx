import * as RadixDialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogOverlay = styled(RadixDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export const DialogContent = styled(RadixDialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  max-width: fit-content;
  max-height: 85vh;
  margin-top: -5vh;
  background-color: white;
  border-radius: 6px;
  &:focus: {
    outline: none;
  }
`;
export const DialogClose = RadixDialog.Close;
