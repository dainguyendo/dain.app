import {
  SpeakerLoudIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { useMount } from "./useMount";
import { Slider, SliderRange, SliderThumb, SliderTrack } from "./Slider";

// const riseIn = keyframes({
//   from: { transform: "translateY(100%)" },
//   to: { transform: "translateY(0%)" },
// });

// const riseOut = keyframes({
//   from: { transform: "translateY(0%)" },
//   to: { transform: "translateY(-100%)" },
// });

// const IconButton = styled("div", {
//   height: "15px",
//   width: "15px",
//   position: "relative",
//   padding: "0px",
//   overflow: "hidden",
//   outline: "none",
//   background: "transparent",
//   border: "none",
// });

// const Icon = styled("div", {
//   position: "absolute",
//   top: "0px",
//   height: "100%",
//   width: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   animationFillMode: "forwards",
// });

interface RotatingIconButtonProps {
  children: React.ReactNode;
  volume: number;
}

function RotatingIconButton({ children, volume }: RotatingIconButtonProps) {
  const icons = React.Children.toArray(children);
  const isInitial = React.useRef(true);

  useMount(() => {
    isInitial.current = false;
  });

  return (
    <div>
      {icons.map((icon, i) => {
        const isCurrent =
          i === 0 && volume === 0
            ? true
            : i === 1 && volume > 0 && volume <= 0.5
            ? true
            : i === 2 && volume > 0.5
            ? true
            : false;
        return (
          <div
            key={i}
            // css={{
            //   animationDuration: `${isInitial.current ? "0" : "300ms"}`,
            //   animationName: isCurrent ? riseIn.toString() : riseOut.toString(),
            // }}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  volume: number;
  onVolumeChange?: (volume: number) => void;
}

export const TracksVolumeSlider = ({ volume, onVolumeChange }: Props) => {
  return (
    <div className="flex align-center justify-center gap-1">
      <RotatingIconButton volume={volume}>
        <SpeakerOffIcon />
        <SpeakerQuietIcon />
        <SpeakerLoudIcon />
      </RotatingIconButton>
      <Slider
        value={[volume]}
        max={1}
        step={0.1}
        aria-label="Volume"
        onValueChange={(number) => {
          const [volume] = number;
          onVolumeChange && onVolumeChange(volume);
        }}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </div>
  );
};
