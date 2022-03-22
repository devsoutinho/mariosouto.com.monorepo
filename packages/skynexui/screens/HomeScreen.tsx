import { Image, Text, useTheme } from '../index';
import { Scaffold } from '../patterns/Scaffold/Scaffold';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function HomeScreen() {
  const theme = useTheme();
  return (
    <Scaffold
      safeArea={{ top: true, bottom: true }}
      styleSheet={{
        backgroundColor: theme.colors?.positive?.x050,
      }}
    >
      <Image
        styleSheet={{
          objectFit: 'cover',
          width: '100%',
          height: '100px',
          backgroundColor: theme.colors?.negative?.x050,
        }}
        src="https://github.com/omariosouto.png"
      />
      {[1,2,3,4,5,6].map((i, index) => (
        <Text key={index + 'oi'} variant='body1'>DevSoutinho!</Text>
      ))}
    </Scaffold>
  );
}

export default AppScreenHOC(HomeScreen);
