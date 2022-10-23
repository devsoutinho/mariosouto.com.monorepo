import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box } from '../box/box';
import { BoxBase } from '../box/box-base';

const StyledImage = styled.Image || (styled as any).img;
const ImageStyled = StyledImage``;

interface ImageProps {
  src: string;
  styleSheet?: StyleSheet;
}
export function Image({ src, styleSheet }: ImageProps) {
  const finalStyleSheet = styleSheet;

  const imageProps = {
    styleSheet: finalStyleSheet,
    src: src,
  };

  return (
    <Box>
      <BoxBase
        as={ImageStyled}
        source={{ uri: '' }}
        {...imageProps}
      />
    </Box>
  );
}
