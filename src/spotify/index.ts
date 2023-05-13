import 'server-only';

import querystring from "querystring";
import { getArtists } from "./utility";
import type { SimplifiedTrack } from "./types";
import { cache } from "react";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json() as Promise<{
    access_token: string;
  }>;
};



export const getRecentTracks = cache(async (limit: number = 20) => {
  const { access_token } = await getAccessToken();
  const endpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 1800},
  }
  );

  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse =
    await response.json();

  return data;
});

export const formatToSimplifiedTrack = (
  track: SpotifyApi.TrackObjectFull
): SimplifiedTrack => {
  return {
    id: track.id,
    albumImageUrl: track?.album?.images[0]?.url,
    artists: track?.artists ? getArtists(track.artists) : '',
    previewUrl: track?.preview_url,
    name: track?.name,
    uri: track?.uri,
  };
};

export const uniqueTrack = (
  item: SpotifyApi.PlayHistoryObject,
  index: number,
  array: SpotifyApi.PlayHistoryObject[]
) => index === array.findIndex((t) => t.track.id === item.track.id);

export const getTrack = cache(async (trackId: string): Promise<SpotifyApi.TrackObjectFull> => {
  const { access_token } = await getAccessToken();
  const endpoint = `https://api.spotify.com/v1/tracks/${trackId}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 1800},
  });

  const data = await response.json();
  return data;
});

