import { useMediaQuery } from "react-responsive";

export function useResponsiveScreen() {
  const isAbove650 = useMediaQuery({ minWidth: "650px" });
  return {
    isAbove650,
  };
}
