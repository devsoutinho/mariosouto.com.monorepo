import { PageConfig } from "next";
import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: "Nextjs" }];
    },
  },
};

const cors = Cors({
  origin: "https://studio.apollographql.com",
  allowCredentials: true,
});

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});
// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
