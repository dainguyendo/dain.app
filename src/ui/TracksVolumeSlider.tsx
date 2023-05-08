import {
  SpeakerLoudIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { Slider, SliderRange, SliderThumb, SliderTrack } from "./Slider";
import { useMount } from "./useMount";

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
    <div className="w-4 h-4 overflow-hidden bg-transparent relative p-0">
      {icons.map((icon, i) => {
        const isCurrent =
          i === 0 && volume === 0
            ? true
            : i === 1 && volume > 0 && volume <= 50
            ? true
            : i === 2 && volume > 50
            ? true
            : false;

        if (!isCurrent) return null;

        return (
          <div
            key={i}
            className={`absolute top-0 w-full h-full flex justify-center items-center ${
              isInitial.current ? "duration-0" : "duration-300"
            } ${
              isCurrent
                ? "animate-[rise-in_300ms_linear]"
                : "animate-[rise-out_300ms_linear]"
            }`}
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
    <div className="flex items-center gap-1 py-2">
      <RotatingIconButton volume={volume}>
        <SpeakerOffIcon />
        <SpeakerQuietIcon />
        <SpeakerLoudIcon />
      </RotatingIconButton>
      <Slider
        value={[volume]}
        max={100}
        step={1}
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
