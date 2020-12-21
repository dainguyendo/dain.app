import { NextApiRequest, NextApiResponse } from "next";
import { getRouteBySlug } from "../../fixed-routes/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const route = getRouteBySlug(id as string, { withGeojson: true });
  return res.status(200).json(route);
};
