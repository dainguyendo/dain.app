import styled from "styled-components";

export const VerticalStack = styled.div<Props>`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: ${(props) => props.theme.spacing[props.space]};
  }
`;

interface Props {
  space: number;
}
