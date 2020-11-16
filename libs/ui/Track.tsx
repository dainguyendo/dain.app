import * as React from "react";
import { Record } from "./Record";
import { Text } from "./Text";
import { defaultTheme } from "./theme";

interface Props extends SpotifyApi.PlayHistoryObject {
  index: number;
  totalTracks: number;
}

export const Track: React.FC<Props> = (props) => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);
  const [hovered, setHover] = React.useState(false);

  const { track } = props;

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
      style={{
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Record
        loading="lazy"
        src={medAlbumImage.url}
        height={125}
        width={125}
        alt={`${artist.name} - ${song} album image`}
      />

      {!!hovered && rect && (
        <div
          css={`
            align-items: center;
            background-color: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(1.5rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: ${defaultTheme.spacing[2]} ${defaultTheme.spacing[3]};
            position: absolute;

            ${deriveYPOsition(rect, props.index, props.totalTracks)};
            ${deriveXPosition(rect, props.index)}

            height: ${rect.height - 16}px;
            width: ${rect.width * 2 + 36}px;
            z-index: 2;
          `}
        >
          <Text fontSize={1} fontWeight="bold">
            {song}
          </Text>
          <Text>{artist.name}</Text>
        </div>
      )}
    </a>
  );
};

function deriveYPOsition(rect: DOMRect, index: number, length: number): string {
  if (index % 3 === 1) {
    if (index >= length - 3) {
      return `bottom: ${16}px`;
    }
    return `top: ${rect.height + 16}px`;
  }

  return `top: 0;`;
}

function deriveXPosition(rect: DOMRect, index: number): string {
  switch (index % 3) {
    case 0:
      return `left: ${rect.width + 56}px;`;
    case 1:
      return `left: 0;`;
    case 2:
    default:
      return `right: ${56}px;`;
  }
}
