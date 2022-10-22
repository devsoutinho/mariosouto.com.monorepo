import { gql } from 'apollo-server-micro';
import { Resolvers } from '../gql_types';
import qrCode from 'qrcode';


export const typeDefs = gql`
  input QrCodeInput {
    text: String
  }

  type QrCode {
    url: String
  }
  extend type Query {
    qrCode(input: QrCodeInput): QrCode!
  }
`;

const resolvers: Resolvers = {
  Query: {
    async qrCode(_, { input } = {}) {
      const { text } = input;
      return {
        url: qrCode.toDataURL(text),
      };
    }
  },
  Mutation: {},
}

export const qrcodeModule = {
  typeDefs,
  resolvers,
};
