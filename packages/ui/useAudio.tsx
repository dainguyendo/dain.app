import React from "react";
import { useMount } from "./useMount";

export const useAudio = (src: string, { volume = 1, playbackRate = 1 }) => {
  const audio = React.useRef<HTMLAudioElement>();

  useMount(() => {
    audio.current = new Audio(src);
    audio.current.volume = volume;
    audio.current.playbackRate = playbackRate;
  });

  React.useEffect(() => {
    if (audio.current) {
      audio.current.src = src;
    }
  }, [src]);

  React.useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
    }
  }, [volume]);

  React.useEffect(() => {
    if (audio.current) {
      audio.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return audio.current;
};
