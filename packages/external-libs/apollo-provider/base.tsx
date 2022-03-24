import { ApolloProvider as ApolloProviderBase } from '@apollo/client';
import { useApollo } from '../apollo-client';

interface ApolloProviderProps {
  children: React.ReactNode;
  pageProps: any;
}
export function ApolloProvider({ children, pageProps }: ApolloProviderProps) {
  const apolloClient = useApollo(pageProps || {});

  return (
    <ApolloProviderBase client={apolloClient}>
      {children}
    </ApolloProviderBase>
  )
}
