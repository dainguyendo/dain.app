import * as React from "react";
import { Record } from "./Record";

export const Track: React.FC<SpotifyApi.PlayHistoryObject> = (props) => {
  const { track } = props;

  const { album, external_urls } = track as SpotifyApi.TrackObjectFull;
  const [artist] = track.artists;
  const song = track.name;

  const medAlbumImage = album.images[album.images.length - 2];

  return (
    <a href={external_urls.spotify} target="_blank">
      <Record
        loading="lazy"
        src={medAlbumImage.url}
        height={125}
        width={125}
        alt={`${artist.name} - ${song} album image`}
      />
    </a>
  );
};
