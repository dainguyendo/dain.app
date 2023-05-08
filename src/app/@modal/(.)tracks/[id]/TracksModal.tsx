"use client";

import { SimplifiedTrack } from "@/spotify/types";
import { InfiniteTranslateX } from "@/ui/InfiniteTranslateX";
import { Record } from "@/ui/Record";
import { RecordPerspective } from "@/ui/RecordPerspective";
import { TracksVolumeSlider } from "@/ui/TracksVolumeSlider";
import { useLocallyStoredVolume } from "@/ui/useLocallyStoredVolume";
import { Link1Icon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

interface Props {
  track: SimplifiedTrack;
}

export default function TracksModal({ track }: Props) {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [cachedVolume, setCacheVolume] = useLocallyStoredVolume();
  const [volume, setVolume] = React.useState<number>(cachedVolume ?? 60);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
    setCacheVolume(volume);
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
      <div className="flex items-center">
        <div className="grid place-items-center">
          <RecordPerspective variant={isPlaying ? "skew" : "flat"}>
            <Record spinning={isPlaying} track={track} />
          </RecordPerspective>
        </div>

        <div className="self-center pl-4 flex items-center gap-4">
          <div>
            <div className="overflow-hidden mb-2">
              {isPlaying ? (
                <InfiniteTranslateX>
                  <h1 className="text-lg font-bold text-rose-500">
                    {track.name}
                  </h1>
                  <h2 className="text-md">{track.artists}</h2>
                </InfiniteTranslateX>
              ) : (
                <>
                  <h1 className="text-lg font-bold text-rose-500">
                    {track.name}
                  </h1>
                  <h2 className="text-md">{track.artists}</h2>
                </>
              )}
            </div>

            <Link href={track.uri} passHref className="flex items-center gap-1">
              <Link1Icon />
              <span className="text-xs">Spotify</span>
            </Link>

            {volume && (
              <TracksVolumeSlider
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            )}
          </div>

          <button type="button" onClick={togglePlayPause}>
            {isPlaying ? (
              <PauseIcon width={32} height={32} />
            ) : (
              <PlayIcon width={32} height={32} />
            )}
          </button>
        </div>
      </div>

      {track.previewUrl && <audio src={track.previewUrl} ref={audioRef} />}
    </div>
  );
}
