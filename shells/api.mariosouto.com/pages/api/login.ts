import { NextApiRequest, NextApiResponse } from "next";
import { withRoute } from "@src/infra/withRoute/withRoute";
import { userLoginController } from "@src/modules/login/controller";


export default withRoute({
  GET: userLoginController,
  POST: function handler(_: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ name: 'Post' });
  },
});
