"use client";

import { SimplifiedTrack } from "@/spotify/types";
import { InfiniteTranslateX } from "@/ui/InfiniteTranslateX";
import { RecordPerspective } from "@/ui/RecordPerspective";
import { RecordSpinning } from "@/ui/RecordSpinning";
import { TracksVolumeSlider } from "@/ui/TracksVolumeSlider";
import { useLocallyStoredVolume } from "@/ui/useLocallyStoredVolume";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Link1Icon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

interface Props {
  track: SimplifiedTrack;
}

export default function TracksModal({ track }: Props) {
  console.log({ track });

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState<number>(60);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    <div className="bg-black p-6">
      <div className="grid grid-cols-4">
        <div className="grid place-items-center">
          <RecordPerspective variant="skew">
            <RecordSpinning track={track} />
          </RecordPerspective>
        </div>

        <div className="col-span-2 self-center">
          <InfiniteTranslateX>
            <h1 className="text-lg font-bold text-rose-500">{track.name}</h1>
            <h2 className="text-md">{track.artists}</h2>
          </InfiniteTranslateX>
          <Link href={track.uri} passHref className="flex items-center gap-1">
            <Link1Icon />
            <span className="text-xs">Spotify</span>
          </Link>
          <TracksVolumeSlider volume={volume} onVolumeChange={setVolume} />
        </div>

        <div className="place-self-center">
          <button onClick={togglePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>

      {track.previewUrl && <audio src={track.previewUrl} ref={audioRef} />}
    </div>
  );
}
