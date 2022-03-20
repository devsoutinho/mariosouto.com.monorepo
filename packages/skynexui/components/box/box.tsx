import { BoxBase } from './box-base';

interface BoxProps {
  as?: any;
  children: React.ReactNode;
}

export function Box({children, ...props}: BoxProps) {
  return (
    <BoxBase {...props}>
      {children}
    </BoxBase>
  )
}
