import { PageConfig } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import { youtubeModule } from '../../modules/posts';
import { qrcodeModule } from '../../modules/qrcode';

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
    qrcodeModule.typeDefs,
    defaultTypeDefs,
  ],
  resolvers: {
    Query: {
      ...youtubeModule.resolvers.Query,
      ...qrcodeModule.resolvers.Query,
      greet: () => 'Welcome to @devsoutinho/api',
    },
    Mutation: {
      ...youtubeModule.resolvers.Mutation,
      ...qrcodeModule.resolvers.Mutation,
      createSampleText: (_: unknown, args) => args.input.text,
    }
  },
};

const apolloServer = new ApolloServer(serverSchema);

const startServer = apolloServer.start();

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};
// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
