import { getAccessToken } from "./getAccessToken";

export const getTrack = async (trackId: string) => {
  const { access_token } = await getAccessToken();
  const endpoint = `https://api.spotify.com/v1/tracks/${trackId}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await response.json();
  return data;
};
