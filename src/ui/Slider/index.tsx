import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";

type SliderRootProps = React.ComponentProps<typeof SliderPrimitive.Root>;

export const Slider = (props: SliderRootProps) => (
  <SliderPrimitive.Root
    className="relative flex items-center select-none touch none h-5 w-36"
    {...props}
  />
);

type SliderTrackProps = React.ComponentProps<typeof SliderPrimitive.Track>;
export const SliderTrack = (props: SliderTrackProps) => (
  <SliderPrimitive.Track
    className="bg-slate-300 dark:bg-slate-500 relative grow rounded-full h-0.5"
    {...props}
  />
);
export const SliderRange = () => (
  <SliderPrimitive.Range className="absolute bg-rose-600 rounded-full h-full" />
);
export const SliderThumb = () => (
  <SliderPrimitive.Thumb className="block rounded-full h-4 w-4 shadow-sm bg-rose-600 hover:bg-rose-500 focus:outline-none hover:shadow-xs" />
);
