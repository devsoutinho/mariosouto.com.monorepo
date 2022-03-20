import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { BoxBase } from '../box/box-base';

const tags = {
  h1: { accessibilityRole: 'heading', accessibilityLevel: 1 },
  h2: { accessibilityRole: 'heading', accessibilityLevel: 2 },
  h3: { accessibilityRole: 'heading', accessibilityLevel: 3 },
  h4: { accessibilityRole: 'heading', accessibilityLevel: 4 },
  h5: { accessibilityRole: 'heading', accessibilityLevel: 5 },
  h6: { accessibilityRole: 'heading', accessibilityLevel: 6 },
  p: { accessibilityRole: 'paragraph' },
};
const DEFAULT_TAG = 'p';

const StyledText = styled.Text || (styled as any).span;
const TextStyled = StyledText``;

interface TextProps {
  // Reference: https://necolas.github.io/react-native-web/docs/accessibility/
  tag?: keyof typeof tags;
  children: React.ReactNode;
  styleSheet?: StyleSheet;
}

export function Text({children, ...props}: TextProps) {
  const currentTag = tags[props.tag || DEFAULT_TAG] || {};

  return (
    <BoxBase
      as={TextStyled} 
      tag={props.tag}
      {...currentTag}
      {...props}
    >
      {children}
    </BoxBase>
  )
}

Text.defaultProps = {
  tag: DEFAULT_TAG
};
