import styled from 'styled-components/native';

const BoxStyled = styled.View``;

interface BoxBaseProps {
  children: React.ReactNode;
  // TODO: Leave like this: https://github.com/skynexui/components/blob/main/lib/core/stylesheet/stylesheet.ts#L93
  [key: string]: any;
}

export function BoxBase({children, ...props}: BoxBaseProps) {
  return (
    <BoxStyled {...props}>
      {children}
    </BoxStyled>
  )
}
