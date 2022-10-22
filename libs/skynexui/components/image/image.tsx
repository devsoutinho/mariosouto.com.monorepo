import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box } from '../box/box';
import { BoxBase } from '../box/box-base';
import { parseCSS, resolveValueForBreakpoint } from '../box/utils/parseCSS';
import { useEnv } from '../provider/provider';

const StyledImage = styled.Image || (styled as any).img;
const ImageStyled = StyledImage``;

interface ImageProps {
  src: string;
  styleSheet?: StyleSheet;
}
export function Image({ src, styleSheet: styleSheetInitial }: ImageProps) {
  const {
    objectFit,
    width,
    ...styleSheet
  } = styleSheetInitial || {};
  const env = useEnv();
  const resizeMode = objectFit || 'cover';

  const isHeightZeroOnWeb = !Boolean(styleSheet.aspectRatio);

  const finalStyleSheet = {
    width,
    display: 'block',
    height: isHeightZeroOnWeb ? '0' : styleSheet.height,
    objectFit: resizeMode,
    ...styleSheet,
  };

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
