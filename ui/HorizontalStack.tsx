import styled, { css } from "styled-components";
import { defaultTheme } from "../theme";

export const HorizontalStack = styled.div<Props>`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: ${(props) => props.theme.spacing[props.space]};
  }
`;

interface Props {
  space: number;
}

export const horizontalStack = (space: number) => css`
  & > * + * {
    margin-left: ${defaultTheme.spacing[space]};
  }
`;
