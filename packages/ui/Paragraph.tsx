import React from "react";
import { Text } from "./Text";
import type { VariantProps, CSSConfig } from "../../stitches.config";

const DEFAULT_TAG = "p";

// type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;
type ParagraphSizeVariants = "1" | "2";
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<
  VariantProps<typeof Text>,
  "size"
>;
type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & { css?: CSSConfig; as?: any };

export const Paragraph = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  ParagraphProps
>((props, forwardedRef) => {
  // '2' here is the default Paragraph size variant
  const { size = "1", ...textProps } = props;

  return (
    <Text as={DEFAULT_TAG} {...textProps} ref={forwardedRef} size={size} />
  );
});
