import {
  SpeakerLoudIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { Flex } from "./Flex";
import { Slider, SliderRange, SliderThumb, SliderTrack } from "./Slider";
import { styled, keyframes } from "../../stitches.config";
import { useMount } from "./useMount";

const riseIn = keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0%)" },
});

const riseOut = keyframes({
  from: { transform: "translateY(0%)" },
  to: { transform: "translateY(-100%)" },
});

const IconButton = styled("div", {
  height: "15px",
  width: "15px",
  position: "relative",
  padding: "0px",
  overflow: "hidden",
  outline: "none",
  background: "transparent",
  border: "none",
});

const Icon = styled("div", {
  position: "absolute",
  top: "0px",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animationFillMode: "forwards",
});

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
    <IconButton>
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
          <Icon
            key={i}
            css={{
              animationDuration: `${isInitial.current ? "0" : "300ms"}`,
              animationName: isCurrent ? riseIn.toString() : riseOut.toString(),
            }}
          >
            {icon}
          </Icon>
        );
      })}
    </IconButton>
  );
}

interface Props {
  defaultVolume: number;
  onVolumeChange?: (volume: number) => void;
}

export const TracksVolumeSlider = ({
  defaultVolume,
  onVolumeChange,
}: Props) => {
  return (
    <Flex
      direction="row"
      css={{ alignItems: "center", justifyContent: "center", gap: "$1" }}
    >
      <RotatingIconButton volume={defaultVolume}>
        <SpeakerOffIcon />
        <SpeakerQuietIcon />
        <SpeakerLoudIcon />
      </RotatingIconButton>
      <Slider
        defaultValue={[defaultVolume]}
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
    </Flex>
  );
};
