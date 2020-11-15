import { getAccessToken } from "./getAccessToken";

export const getRecentTracks = async (limit: number = 20) => {
  const { access_token } = await getAccessToken();
  const endpoint = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
