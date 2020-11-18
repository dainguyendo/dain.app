import styled, { css } from "styled-components";
import { defaultTheme } from "../theme";

interface Props {
  space: number;
}

export const VerticalStack = styled.div<Props>`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: ${(props) => props.theme.spacing[props.space]};
  }
`;

export const verticalStack = (space: number) => css`
  & > * + * {
    margin-left: ${defaultTheme.spacing[space]};
  }
`;
