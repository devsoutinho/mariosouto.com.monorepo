import { gql } from 'apollo-server-micro';
import { Resolvers } from '../graphql';


export const typeDefs = gql`
type QrCode {
  url: String
}

extend type Query {
  qrCode: QrCode!
}
`;

const resolvers: Resolvers = {
  Query: {
    async qrCode() {
      return {
        url: 'qrcodeurl',
      };
    }
  },
  Mutation: {},
}

export const qrcodeModule = {
  typeDefs,
  resolvers,
};
