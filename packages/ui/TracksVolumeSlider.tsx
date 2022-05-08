import { SpeakerLoudIcon, SpeakerQuietIcon } from "@radix-ui/react-icons";
import React from "react";
import { Flex } from "./Flex";
import { Slider, SliderRange, SliderThumb, SliderTrack } from "./Slider";

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
      css={{ alignItems: "center", justifyContent: "center", gap: "$2" }}
    >
      <SpeakerQuietIcon />
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
      <SpeakerLoudIcon />
    </Flex>
  );
};
