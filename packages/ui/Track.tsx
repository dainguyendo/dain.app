import { motion } from "framer-motion";
import * as React from "react";
import { TrackTooltip } from "../../packages/ui/TrackTooltip";
import { Text } from "../../packages/ui/Text";
import { VisuallyHidden } from "../../packages/ui/VisuallyHidden";
import { usePlayPreview } from "../../providers/PlayPreviewContext";
import useAudio from "../../ui/useAudio";
import { Link } from "./Link";
import { Record } from "./Record";

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

  const enablePreviewAndPlay = () => {
    setHover(true);
    !!preview && controls.play();
  };

  const disablePreviewAndPause = () => {
    setHover(false);
    !!preview && controls.pause();
  };

  return (
    <Link
      href={track.uri}
      target="_blank"
      onMouseEnter={enablePreviewAndPlay}
      onTouchStart={enablePreviewAndPlay}
      onMouseLeave={disablePreviewAndPause}
      onTouchEnd={disablePreviewAndPause}
    >
      <VisuallyHidden>{`${song} by ${artist.name}`}</VisuallyHidden>
      <Record
        src={medAlbumImage.url}
        height={125}
        width={125}
        whileHover={{
          rotate: 360,
          transition: {
            ease: "linear",
            repeat: Infinity,
            duration: 5,
          },
        }}
        whileTap={{
          rotate: 360,
          transition: {
            ease: "linear",
            repeat: Infinity,
            duration: 5,
          },
        }}
      />
      {audio}
      {hovered && (
        <TrackTooltip
          initial="hidden"
          animate="show"
          variants={tooltipVariants}
          transition={{ when: "afterChildren" }}
          style={{
            height: "100%",
            width: "100%",
          }}
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
            <Text bold>{song}</Text>
            <Text>{artist.name}</Text>
          </motion.div>
        </TrackTooltip>
      )}
    </Link>
  );
};
