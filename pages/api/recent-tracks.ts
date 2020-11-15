import { NextApiRequest, NextApiResponse } from "next";
import { getRecentTracks } from "../../libs/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit } = req.query;
  const response = await getRecentTracks(Number(limit));
  const data: SpotifyApi.UsersRecentlyPlayedTracksResponse = await response.json();
  return res.status(200).json(data);
};
