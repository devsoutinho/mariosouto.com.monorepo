import React from 'react';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { BoxBase } from './box-base';

interface BoxProps {
  ref?: any;
  tag?: any;
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
}

export const Box = React.forwardRef(({children, ...props}: BoxProps, ref) => {
  return (
    <BoxBase ref={ref} {...props}>
      {children}
    </BoxBase>
  )
});

Box.defaultProps = {
  tag: 'div',
}
