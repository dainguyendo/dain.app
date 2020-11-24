import { motion } from "framer-motion";
import * as React from "react";
import { usePlayPreview } from "../providers/PlayPreviewContext";
import { Anchor } from "./Anchor";
import { Record } from "./Record";
import { Text } from "./Text";
import { TrackTooltip } from "./TrackTooltip";
import useAudio from "./useAudio";
import { VisuallyHidden } from "./VisuallyHidden";

const tooltipVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
const variants = {
  right: {
    x: "100%",
  },
  left: {
    x: "-100%",
  },
};
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

  React.useEffect(() => {
    if (controls) {
      controls.volume(0.2);
    }
  }, []);

  const { preview } = usePlayPreview();

  const { album } = track as SpotifyApi.TrackObjectFull;
  const [artist] = track.artists;
  const song = track.name;

  const medAlbumImage = album.images[album.images.length - 2];
  const rect = ref.current?.getBoundingClientRect();

  const enablePreviewAndPlay = () => {
    setHover(true);
    !!preview && controls.play();
  };

  const disablePreviewAndPause = () => {
    setHover(false);
    !!preview && controls.pause();
  };

  return (
    <Anchor
      ref={ref}
      href={track.uri}
      target="_blank"
      onMouseEnter={enablePreviewAndPlay}
      onTouchStart={enablePreviewAndPlay}
      onMouseLeave={disablePreviewAndPause}
      onTouchEnd={disablePreviewAndPause}
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
          initial="hidden"
          animate="show"
          variants={tooltipVariants}
          transition={{ when: "afterChildren" }}
          rect={rect}
        >
          <motion.div
            initial="right"
            animate="left"
            variants={variants}
            transition={{
              duration: 4.75,
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
    </Anchor>
  );
};
