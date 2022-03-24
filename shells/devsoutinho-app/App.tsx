import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './setup-demo/hooks/useCachedResources';
import Navigation from './navigation';
import { SkynexUIProvider } from 'skynexui';
import { ApolloProvider } from 'external-libs/apollo-provider/native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* Reference: https://github.com/chagasaway/tdc-2019 */}
        <ApolloProvider>
          <SkynexUIProvider
            useRouterHook={useNavigation}
          >
            <Navigation />
          </SkynexUIProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
