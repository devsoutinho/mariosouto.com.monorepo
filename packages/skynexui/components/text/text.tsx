import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { BoxBase } from '../box/box-base';
import { defaultTheme } from '../../core/theme/defaultTheme';
import { useEnv, useTheme } from '../provider/provider';

const tags = {
  h1: { accessibilityRole: 'heading', accessibilityLevel: 1 },
  h2: { accessibilityRole: 'heading', accessibilityLevel: 2 },
  h3: { accessibilityRole: 'heading', accessibilityLevel: 3 },
  h4: { accessibilityRole: 'heading', accessibilityLevel: 4 },
  h5: { accessibilityRole: 'heading', accessibilityLevel: 5 },
  h6: { accessibilityRole: 'heading', accessibilityLevel: 6 },
  p:  { accessibilityRole: 'paragraph' },
  span: { accessibilityRole: 'paragraph' },
};
const DEFAULT_TAG = 'p';

const StyledText = styled.Text || (styled as any).span;
const TextStyled = StyledText``;

interface TextProps {
  // Reference: https://necolas.github.io/react-native-web/docs/accessibility/
  tag?: keyof typeof tags;
  variant?: keyof typeof defaultTheme.typography.variants;
  children: React.ReactNode;
  styleSheet?: StyleSheet;
  selectable?: boolean;
}

export function Text({children, variant, styleSheet, ...props}: TextProps) {
  const theme = useTheme();
  const env = useEnv();
  const defaultVariant = variant || theme.components?.text.defaultVariant as keyof typeof defaultTheme.typography.variants;
  const currentVariantStyles = theme.typography?.variants[defaultVariant];
  const currentTag = tags[props.tag || DEFAULT_TAG] || {};

  const formatedStyleSheet = {
    ...styleSheet,
    ...currentVariantStyles,
  }

  console.log(currentTag)

  return (
    <BoxBase
      as={TextStyled} 
      tag={props.tag}
      styleSheet={formatedStyleSheet}
      {...(env.isWeb() || env.isIOS()) && currentTag}
      {...props}
    >
      {children}
    </BoxBase>
  )
}

Text.defaultProps = {
  tag: DEFAULT_TAG
};
