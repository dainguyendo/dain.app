"use client";

import { SimplifiedTrack } from "@/spotify/types";
import { InfiniteTranslateX } from "@/ui/InfiniteTranslateX";
import { Record } from "@/ui/Record";
import { RecordPerspective } from "@/ui/RecordPerspective";
import { useLocallyStoredVolume } from "@/ui/useLocallyStoredVolume";
import { stiffSpring } from "@/ui/utilities/transition";
import { banner } from "@/ui/utilities/variants";
import { Link1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface Props {
  track: SimplifiedTrack;
}

const TrackPage = ({ track }: Props) => {
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
    <main className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.3,
          ...stiffSpring,
        }}
      >
        <div className="flex items-center">
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            type="button"
            onClick={togglePlayPause}
            className="grid place-items-center"
          >
            <RecordPerspective variant={isPlaying ? "skew" : "flat"}>
              <Record size="w-96 h-96" spinning={isPlaying} track={track} />
            </RecordPerspective>
          </button>
        </div>

        {track.previewUrl && <audio src={track.previewUrl} ref={audioRef} />}
      </motion.div>

      <motion.div
        layoutId="peeked-track"
        initial="horizontalHidden"
        animate="horizontalVisible"
        exit="horizontalHidden"
        variants={banner}
        transition={{ duration: 0.3, ...stiffSpring }}
        className="flex flex-col gap-1 bg-rose-600 text-white py-2 px-4 md:py-8 md:px-12 relative w-full truncate"
      >
        {isPlaying ? (
          <InfiniteTranslateX>
            <h1 className="text-lg md:text-5xl font-bold truncate">
              {track.name}
            </h1>
            <h2 className="text-md md:text-4xl truncate">{track.artists}</h2>
          </InfiniteTranslateX>
        ) : (
          <div className="text-clip whitespace-nowrap">
            <h1 className="text-lg md:text-5xl font-bold truncate">
              {track.name}
            </h1>
            <h2 className="text-md md:text-4xl truncate">{track.artists}</h2>
          </div>
        )}
        <Link href={track.uri} passHref className="flex items-center gap-1">
          <Link1Icon />
          <span className="text-xs">Spotify</span>
        </Link>
      </motion.div>
    </main>
  );
};

export default TrackPage;
