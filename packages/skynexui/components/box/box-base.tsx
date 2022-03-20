import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { parseCSS } from './utils/parseCSS';

const BoxStyled = styled.View<BoxBaseProps>`
  ${({ styleSheet }) => parseCSS({ styleSheet: styleSheet || {} })}
`;

interface BoxBaseProps {
  children: React.ReactNode;
  styleSheet?: StyleSheet;
  // TODO: Leave like this: https://github.com/skynexui/components/blob/main/lib/core/stylesheet/stylesheet.ts#L93
  [key: string]: any;
}

export function BoxBase({children, styleSheet, ...props}: BoxBaseProps) {
  return (
    <BoxStyled
      styleSheet={styleSheet}
      {...props}
    >
      {children}
    </BoxStyled>
  )
}

BoxBase.defaultProps = {
  styleSheet: {},
}
