import React from "react";
import { CSSConfig, VariantProps } from "../../stitches.config";
import { Text } from "./Text";

const DEFAULT_TAG = "h1";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type HeadingSizeVariants = "1" | "2" | "3" | "4";
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  "size"
>;
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSSConfig; as?: any };

export const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  // '2' here is the default heading size variant
  const { size = "1", ...textProps } = props;
  // This is the mapping of Heading Variants to Text variants
  const textSize: Record<HeadingSizeVariants, TextSizeVariants["size"]> = {
    1: { "@initial": "4" },
    2: { "@initial": "6" },
    3: { "@initial": "7" },
    4: { "@initial": "8" },
  };

  return (
    <Text
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      size={textSize[size]}
      css={{
        fontWeight: 700,
        ...props.css,
      }}
    />
  );
});
