import { getAccessToken } from "./getAccessToken";

export const getRecentTracks = async (limit: number = 20) => {
  const { access_token } = await getAccessToken();
  const endpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse = await response.json();
  return data;
};
