import { PageConfig } from "next";
import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import { youtubeModule } from '../../modules/posts';

const defaultTypeDefs = gql`
  input CreateSampleTextInput {
    text: String!
  }
  
  # ====================================================

  type Mutation {
    createSampleText(input: CreateSampleTextInput): String!
  }
  type Query {
    greet: String
  }
`;

const serverSchema = {
  typeDefs: [
    youtubeModule.typeDefs,
    defaultTypeDefs,
  ],
  resolvers: {
    Query: {
      ...youtubeModule.resolvers.Query,
      greet: () => 'Welcome to @devsoutinho/api',
    },
    Mutation: {
      ...youtubeModule.resolvers.Mutation,
      createSampleText: (_: unknown, args) => args.input.text,
    }
  },
};

const cors = Cors({
  origin: "*",
  allowCredentials: true,
});

const apolloServer = new ApolloServer(serverSchema);

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
