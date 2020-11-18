import { useMediaQuery } from "react-responsive";
import { defaultTheme } from "../theme";

export function useResponsiveScreen() {
  const isAbove650 = useMediaQuery({ minWidth: defaultTheme.breakpoints[0] });
  return {
    isAbove650,
  };
}
