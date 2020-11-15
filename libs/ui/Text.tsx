import styled, { DefaultTheme } from "styled-components";

interface Props {
  color?: keyof DefaultTheme["colors"];
  fontFamily?: keyof DefaultTheme["fonts"];
  fontSize?: number;
  fontWeight?: keyof DefaultTheme["fontWeights"];
  lineHeight?: keyof DefaultTheme["lineHeights"];
}

export const Text = styled.span<Props>`
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.text};
  font-family: ${(props) => props.fontFamily ?? props.theme.fonts.body};
  font-size: ${(props) =>
    props.fontSize
      ? props.theme.fontSizes[props.fontSize]
      : props.theme.fontSizes[0]};
  font-weight: ${(props) => props.fontWeight ?? props.theme.fontWeights.body};
  line-height: ${(props) =>
    props.lineHeight
      ? props.theme.lineHeights[props.lineHeight]
      : props.theme.lineHeights.body};
`;
