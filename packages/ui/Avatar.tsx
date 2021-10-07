import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { styled } from "../../stitches.config";

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 45,
  height: 45,
  borderRadius: "100%",
});

const StyledImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: "$crimson11",
  fontSize: "$3",
  fontWeight: 700,
});

// Exports
export const Avatar = StyledAvatar;
export const AvatarImage = StyledImage;
export const AvatarFallback = StyledFallback;
