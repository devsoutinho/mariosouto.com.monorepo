import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderBase } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://mariosouto-com-api.vercel.app/api/graphql',
  cache: new InMemoryCache()
});

interface ApolloProviderProps {
  children: React.ReactNode;
}
export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloProviderBase client={client}>
      {children}
    </ApolloProviderBase>
  )
}
