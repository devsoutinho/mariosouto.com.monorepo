import { NextApiRequest, NextApiResponse } from "next";

interface HttpMethods {
  GET?: (req: NextApiRequest, res: NextApiResponse) => void;
  POST?: (req: NextApiRequest, res: NextApiResponse) => void;
  PUT?: (req: NextApiRequest, res: NextApiResponse) => void;
  DELETE?: (req: NextApiRequest, res: NextApiResponse) => void;
}
export function withRoute(httpMethods: HttpMethods) {
  return (request: NextApiRequest, response: NextApiResponse) => {
    return httpMethods[request.method](request, response);
  }
}
