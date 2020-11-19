import { motion } from "framer-motion";
import * as React from "react";
import { usePlayPreview } from "../providers/PlayPreviewContext";
import { Record } from "./Record";
import { Text } from "./Text";
import { TrackTooltip } from "./TrackTooltip";
import useAudio from "./useAudio";
import { VisuallyHidden } from "./VisuallyHidden";

interface Props extends SpotifyApi.PlayHistoryObject {
  index: number;
  totalTracks: number;
}

export const Track: React.FC<Props> = (props) => {
  const { track } = props;

  const ref = React.useRef<HTMLAnchorElement | null>(null);
  const [hovered, setHover] = React.useState(false);
  const [audio, , controls] = useAudio({
    src: track.preview_url ?? "",
    autoPlay: false,
  });

  const { preview } = usePlayPreview();

  const { album, external_urls } = track as SpotifyApi.TrackObjectFull;
  const [artist] = track.artists;
  const song = track.name;

  const medAlbumImage = album.images[album.images.length - 2];
  const rect = ref.current?.getBoundingClientRect();

  return (
    <a
      ref={ref}
      href={external_urls.spotify}
      target="_blank"
      onMouseEnter={() => {
        setHover(true);
        !!preview && controls.play();
      }}
      onMouseLeave={() => {
        setHover(false);
        !!preview && controls.pause();
      }}
    >
      <VisuallyHidden>{`${song} by ${artist.name}`}</VisuallyHidden>
      <Record
        loading="lazy"
        src={medAlbumImage.url}
        height={125}
        width={125}
        alt={`${artist.name} - ${song} album image`}
      />
      {audio}
      {hovered && rect && (
        <TrackTooltip
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ when: "afterChildren" }}
          rect={rect}
        >
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: "-100%",
            }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Text fontWeight="bold">{song}</Text>
            <Text>{artist.name}</Text>
          </motion.div>
        </TrackTooltip>
      )}
    </a>
  );
};
