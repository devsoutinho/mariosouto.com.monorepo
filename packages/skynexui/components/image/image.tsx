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
  const { objectFit, ...styleSheet} = styleSheetInitial || {};
  const env = useEnv();
  const hasHeightImpactfullStyle = Boolean(styleSheet?.aspectRatio) || Boolean(styleSheet?.height);
  const resizeMode = objectFit || 'cover';

  const imageProps = {
    styleSheet: {
      ...styleSheet,
      flex: 1,
      ...(env.isWeb() && {
        objectFit: resizeMode,
        height: hasHeightImpactfullStyle ? styleSheet?.height : '0',
      })
    },
    ...(!env.isWeb() && {
      source: {
        uri: src,
      },
      resizeMode: (() => {
        const result = resolveValueForBreakpoint(resizeMode, env.getCurrentBreakpoint());
        if(result === 'fill') return 'stretch';
        return result;
      })(),
    }),
    ...(env.isWeb() && {
      src: src,
    })
  };

  return (
    <BoxBase
      as={ImageStyled}
      source={{ uri: '' }}
      {...imageProps}
    />
  );
}
