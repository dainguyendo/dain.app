import * as SliderPrimitive from "@radix-ui/react-slider";
import styles from "./styles.module.css";
import React from "react";

type SliderRootProps = React.ComponentProps<typeof SliderPrimitive.Root>;

export const Slider = (props: SliderRootProps) => (
  <SliderPrimitive.Root {...props} className={styles.SliderRoot} />
);

type SliderTrackProps = React.ComponentProps<typeof SliderPrimitive.Track>;
export const SliderTrack = (props: SliderTrackProps) => (
  <SliderPrimitive.Track {...props} className={styles.SliderTrack} />
);
export const SliderRange = () => (
  <SliderPrimitive.Range className={styles.SliderRange} />
);
export const SliderThumb = () => (
  <SliderPrimitive.Thumb className={styles.SliderThumb} />
);
