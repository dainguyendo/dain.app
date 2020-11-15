import styled, { keyframes } from "styled-components";

const color = keyframes`
  0% { background-color: hsl(100.71,23.53%,53.33%) }
  63% { background-color: hsl(91.62,37.76%,38.43%) }
  100% { background-color: hsl(100.71,23.53%,53.33%) }
`;

const Animation = styled.div`
  animation-name: ${color};
  animation-direction: normal;
  animation-duration: 1515ms;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.2, 1, 0.3, 1);

  height: ${(props) => props.theme.spacing[2]};
`;

export const Pulse = () => {
  return <Animation></Animation>;
};
