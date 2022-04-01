import { PageConfig } from "next";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { ApolloServer, gql } from "apollo-server-micro";
import { postsModule } from '../../modules/posts';
import { qrcodeModule } from '../../modules/qrcode';
import { youtubeModule } from '../../modules/youtube';

const defaultTypeDefs = gql`
  # Commons
  input FieldFilter {
    gte: String
    lt: String
    eq: String
  }
  # ====================================================
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
    postsModule.typeDefs,
    qrcodeModule.typeDefs,
    youtubeModule.typeDefs,
    defaultTypeDefs,
  ],
  resolvers: {
    Query: {
      ...postsModule.resolvers.Query,
      ...qrcodeModule.resolvers.Query,
      ...youtubeModule.resolvers.Query,
      greet: () => 'Welcome to @devsoutinho/api',
    },
    Mutation: {
      ...postsModule.resolvers.Mutation,
      ...qrcodeModule.resolvers.Mutation,
      ...youtubeModule.resolvers.Mutation,
      createSampleText: (_: unknown, args) => args.input.text,
    }
  },
  plugins: [
    process.env.NODE_ENV === 'production' && ApolloServerPluginLandingPageGraphQLPlayground(),
  ].filter(Boolean),
  introspection: true,
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
