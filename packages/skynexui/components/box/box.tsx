import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { BoxBase } from './box-base';

interface BoxProps {
  tag?: any;
  styleSheet?: StyleSheet;
  children: React.ReactNode;
}

export function Box({children, ...props}: BoxProps) {
  return (
    <BoxBase {...props}>
      {children}
    </BoxBase>
  )
}

Box.defaultProps = {
  tag: 'div',
}
