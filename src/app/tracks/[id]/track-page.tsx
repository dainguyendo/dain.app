"use client";

import { SimplifiedTrack } from "@/spotify/types";
import { InfiniteTranslateX } from "@/ui/InfiniteTranslateX";
import { Record } from "@/ui/Record";
import { RecordPerspective } from "@/ui/RecordPerspective";
import { useLocallyStoredVolume } from "@/ui/useLocallyStoredVolume";
import { Link1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface Props {
  track: SimplifiedTrack;
}

export const TrackPage = ({ track }: Props) => {
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
    <>
      <div className="p-6">
        <div className="flex items-center">
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            type="button"
            onClick={togglePlayPause}
            className="grid place-items-center"
          >
            <RecordPerspective variant={isPlaying ? "skew" : "flat"}>
              <Record size="large" spinning={isPlaying} track={track} />
            </RecordPerspective>
          </button>
        </div>

        {track.previewUrl && <audio src={track.previewUrl} ref={audioRef} />}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-1 bg-rose-600 text-white py-8 px-12 relative w-full truncate"
      >
        {isPlaying ? (
          <InfiniteTranslateX>
            <h1 className="text-5xl font-bold truncate">{track.name}</h1>
            <h2 className="text-4xl truncate">{track.artists}</h2>
          </InfiniteTranslateX>
        ) : (
          <div className="text-clip whitespace-nowrap">
            <h1 className="text-5xl font-bold truncate">{track.name}</h1>
            <h2 className="text-4xl truncate">{track.artists}</h2>
          </div>
        )}
        <Link href={track.uri} passHref className="flex items-center gap-1">
          <Link1Icon />
          <span className="text-xs">Spotify</span>
        </Link>
      </motion.div>
    </>
  );
};
