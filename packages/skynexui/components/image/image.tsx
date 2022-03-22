import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box } from '../box/box';
import { BoxBase } from '../box/box-base';
import { useEnv } from '../provider/provider';

const StyledImage = styled.Image || (styled as any).img;
const ImageStyled = StyledImage`
`;

interface ImageProps {
  src: string;
  styleSheet?: StyleSheet;   
}
export function Image({ src, styleSheet }: ImageProps) {
  const env = useEnv();

  const imageProps = {
    styleSheet: {
      // ...styleSheet,
      flex: 1,
      ...(env.isWeb() && {
        objectFit: 'cover',
        height: 'inherit',
      })
    },
    ...(!env.isWeb() && {
      source: {
        uri: src,
      }
    }),
    ...(env.isWeb() && {
      src: src,
    })
  };

  return (
    <Box
      styleSheet={{
        ...styleSheet,
      }}
    >
      <BoxBase
        as={ImageStyled}
        source={{ uri: '' }}
        {...imageProps}
      />
    </Box>
  );
}
