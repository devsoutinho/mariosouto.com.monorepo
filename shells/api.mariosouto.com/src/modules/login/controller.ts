import { NextApiRequest, NextApiResponse } from "next";

export const userLoginController = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'Post' });
};
