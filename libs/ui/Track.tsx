import * as React from "react";
import styled from "styled-components";
import { Record } from "./Record";
import { Text } from "./Text";
import { defaultTheme } from "./theme";
import { VerticalStack } from "./VerticalStack";

const TrackCard = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  padding: ${(props) => props.theme.spacing[2]};
  place-items: center;
`;

export const Track: React.FC<SpotifyApi.PlayHistoryObject> = (props) => {
  const { track } = props;

  const { album, external_urls } = track as SpotifyApi.TrackObjectFull;
  const [artist] = track.artists;
  const song = track.name;

  const smallAlbumImage = album.images[album.images.length - 1];
  const medAlbumImage = album.images[album.images.length - 2];

  // return (
  //   <TrackCard>
  //     <img
  //       loading="lazy"
  //       src={smallAlbumImage.url}
  //       height={smallAlbumImage.height ?? 64}
  //       width={smallAlbumImage.width ?? 64}
  //       alt={`${artist.name} - ${song} album image`}
  //     />
  //     <VerticalStack space={1} style={{ marginLeft: defaultTheme.spacing[1] }}>
  //       <a href={external_urls.spotify} target="_blank">
  //         <Text fontWeight="bold">{song}</Text>
  //       </a>
  //       <Text>{artist.name}</Text>
  //     </VerticalStack>
  //   </TrackCard>
  // );

  return (
    <div>
      <Record
        loading="lazy"
        src={medAlbumImage.url}
        height={125}
        width={125}
        alt={`${artist.name} - ${song} album image`}
      />
      {/* <VerticalStack
        space={1}
        style={{
          backgroundColor: defaultTheme.colors.muted,
          marginLeft: defaultTheme.spacing[1],
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <a href={external_urls.spotify} target="_blank">
          <Text fontWeight="bold">{song}</Text>
        </a>
        <Text>{artist.name}</Text>
      </VerticalStack> */}
    </div>
  );
};
