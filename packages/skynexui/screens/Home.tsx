import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../index';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen sample!</Text>
      <Button label="Custom Label works?" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
