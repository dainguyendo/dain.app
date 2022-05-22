import { getAccessToken } from "./getAccessToken";
import { getArtists } from "./utils";
import type { SimplifiedTrack } from "./types";

export const getRecentTracks = async (limit: number = 20) => {
  const { access_token } = await getAccessToken();
  const endpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse =
    await response.json();

  return data;
};

export const formatToSimplifiedTrack = (
  track: SpotifyApi.TrackObjectFull
): SimplifiedTrack => {
  return {
    id: track.id,
    albumImageUrl: track.album.images[0]?.url,
    artists: getArtists(track.artists),
    previewUrl: track.preview_url,
    name: track.name,
    uri: track.uri,
  };
};

export const uniqueTrack = (
  item: SpotifyApi.PlayHistoryObject,
  index: number,
  array: SpotifyApi.PlayHistoryObject[]
) => index === array.findIndex((t) => t.track.id === item.track.id);
