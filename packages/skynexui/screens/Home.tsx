import styled from 'styled-components/native';
import { Button } from '../index';

const View = styled.View`
  flex: 1;
  background-color:#ff0;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

export function HomeScreen() {
  return (
    <View>
      <Text>Home Screen sample!</Text>
      <Button label="Custom Label works?" />
    </View>
  );
}
