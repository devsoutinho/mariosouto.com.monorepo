import { useRouter } from 'next/router';
import { Text } from "../Text/Text";
import styled from "styled-components";
import { ButtonSize, buttonSize } from "./size";
import { ColorVariant, colorVariantBy, Variant } from "./colorVariantBy";
import { StyleSheet } from "@src/ui-system/theme/StyleSheet";
import React from "react";
import { useRipple } from "react-use-ripple";
import useTheme from "@src/ui-system/theme/useTheme";

const StyledButton = styled(Text)<any>`
  position: relative;
  overflow: hidden;
  outline: 0;
  cursor: pointer;
  text-decoration: none;
`;

interface ButtonBaseProps {
  children?: React.ReactNode;
  href?: string;
  rippleContrast?: 'light' | 'dark';
  styleSheet?: StyleSheet;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function ButtonBase({ children, styleSheet, href, rippleContrast, ...props }: ButtonBaseProps) {
  const buttonRef = React.useRef();
  const router = useRouter();
  const isLink = Boolean(href);
  const tag = isLink ? 'a' : 'button';

  useRipple(buttonRef, {
    animationLength: 600,
    rippleColor: rippleContrast === 'light' ? `rgba(255, 255, 255, 0.7)` : `rgba(0, 0, 0, 0.7)`
  });

  return (
    <StyledButton
      ref={buttonRef}
      tag={tag}
      href={href}
      styleSheet={{
        border: '0',
        background: 'transparent',
        color: 'inherit',
        ...styleSheet,
      }}
      onClick={(event) => {
        isLink && event.preventDefault();
        isLink && router.push(href);
        !isLink && props.onClick && props.onClick(event);
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

ButtonBase.defaultProps = {
  rippleContrast: 'light',
}

interface ButtonProps extends ButtonBaseProps {
  variant?: Variant;
  colorVariant?: ColorVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}
export function Button({
  variant,
  colorVariant,
  children,
  fullWidth,
  styleSheet,
  size,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <ButtonBase
      styleSheet={{
        border: 0,
        alignSelf: 'flex-start',
        color: 'white',
        textAlign: 'center',
        // [Color + Variant]
        ...colorVariantBy(theme, colorVariant, variant),
        // [Size]
        ...buttonSize[size],
        // [Full Width]
        ...(fullWidth && {
          alignSelf: 'initial'
        }),
        ...styleSheet,
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  )
}
Button.defaultProps = {
  size: 'md',
  variant: 'contained',
  colorVariant: 'primary',
};

Button.Base = ButtonBase;
