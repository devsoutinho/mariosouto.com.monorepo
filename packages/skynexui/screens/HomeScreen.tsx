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
          objectFit: {
            xs: 'cover',
            sm: 'contain',
          },
          width: "20%",
          aspectRatio: 1,
          backgroundColor: theme.colors?.negative?.x050,
        }}
        src="https://github.com/omariosouto.png"
      />
      {[1,2,3,4,5,6,7,1,1,,2123,,123,123,231,312,3,12,312,123,123,312,123,123,312,312,231,312,2,42,412,2,13,213,312,31,312,312,23,14,2,124,3,213,123,123,321,312,3,12,1,124,1].map((i, index) => (
        <Text key={index + 'oi'} variant='body1'>DevSoutinho!</Text>
      ))}
    </Scaffold>
  );
}

export default AppScreenHOC(HomeScreen);
