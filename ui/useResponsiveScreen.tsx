import { useMediaQuery } from "react-responsive";
import { useTheme } from "styled-components";

export function useResponsiveScreen() {
  const theme = useTheme();
  const isAbove650 = useMediaQuery({ minWidth: theme.breakpoints[0] });
  return {
    isAbove650,
  };
}
