// Import Declarations
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import HomeScreen from 'skynexui/screens/HomeScreen';
import SettingsScreen from 'skynexui/screens/SettingsScreen';
import NotFoundScreen from 'skynexui/screens/NotFoundScreen';
import { MainNavigationMenu } from 'skynexui/patterns/MainNavigationMenu/MainNavigationMenu';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
type RootTabParamList = {
  '/': undefined;
  '/settings': undefined;
};
type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
* A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
* https://reactnavigation.org/docs/bottom-tab-navigator
*/
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="/"
      tabBar={(props) => <MainNavigationMenu {...props as any} />}
    >
      <BottomTab.Screen
        name="/"
        component={HomeScreen}
        options={{
          title: 'HomeScreen',
          tabBarIcon: () => null,
        }}
      />
      <BottomTab.Screen
        name="/settings"
        component={SettingsScreen}
        options={{
          title: 'Settings Screen',
          tabBarIcon: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
}
