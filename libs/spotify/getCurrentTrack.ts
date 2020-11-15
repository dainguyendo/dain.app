import { getAccessToken } from "./getAccessToken";

const endpoint = "https://api.spotify.com/v1/me/player/currently-playing";

export const getCurrentTrack = async () => {
  const { access_token } = await getAccessToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
