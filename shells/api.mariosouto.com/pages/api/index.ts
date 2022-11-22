import { Request, Response, withRoute } from "@src/infra/withRoute/withRoute";

export default withRoute({
  GET(_: Request, res: Response) {
    res.status(200).json({
      message: "[API] Devsoutinho API",
      endpoints: [
        "/api/graphql",
        "/api/login",
      ]
    });
  },
});
