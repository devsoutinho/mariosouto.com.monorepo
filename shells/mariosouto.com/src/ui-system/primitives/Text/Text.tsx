import BaseComponent from "@src/ui-system/theme/BaseComponent";
import { StyleSheet } from "@src/ui-system/theme/StyleSheet";
import React from "react";
import { typography } from "./typography";

export type TextVariant = keyof typeof typography;

interface TextProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | string;
  variant?: TextVariant;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  onClick?: (event: any) => void;
  ref: any;
}
export const Text = React.forwardRef(({ tag, variant, styleSheet, children, ...props }: TextProps, ref) => {
  return (
    <BaseComponent
      as={tag}
      ref={ref}
      styleSheet={{
        ...typography[variant],
        ...styleSheet,
      }}
      {...props}
    >
      {children}
    </BaseComponent>
  )
})

Text.defaultProps = {
  tag: 'p',
  variant: 'body2',
}
