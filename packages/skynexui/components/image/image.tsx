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
  const isWidthFitContent = Boolean(styleSheet.aspectRatio) && Boolean(styleSheet.maxHeight);

  const finalStyleSheet = {
    width,
    ...(env.isWeb() && {
      display: 'block',
      height: isHeightZeroOnWeb ? '0' : styleSheet.height,
      objectFit: resizeMode,
      width: isWidthFitContent
      ? 'fit-content'
      : width,
    }),
    ...styleSheet,
  };

  const imageProps = {
    styleSheet: finalStyleSheet,
    ...(!env.isWeb() && {
      source: {
        uri: src,
      },
      resizeMode: (() => {
        const result = typeof resizeMode === 'object'
          ? resolveValueForBreakpoint(resizeMode, env.getCurrentBreakpoint())
          : resizeMode;

        if (result === 'fill') return 'stretch';
        return result;
      })(),
    }),
    ...(env.isWeb() && {
      src: src,
    })
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
