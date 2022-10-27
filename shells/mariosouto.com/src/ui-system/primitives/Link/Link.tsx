import React from "react";
import NextLink from "next/link";
import { Text, TextVariant } from "../Text/Text";
import useTheme from "@src/ui-system/theme/useTheme";
import { StyleSheet } from "@src/ui-system/theme/StyleSheet";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  styleSheet?: StyleSheet;
  variant?: TextVariant;
  colorVariant?: 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'dark' | 'light';
  colorVariantEnabled?: boolean;
}
export const Link = React.forwardRef(({ href, children, styleSheet, colorVariant, colorVariantEnabled, ...props }: LinkProps, ref) => {
  const theme = useTheme();

  const currentColorMapBy = {
    dark: {
      color: theme.colors.neutral.x900,
      hover: { color: theme.colors.neutral.x700, },
      focus: { color: theme.colors.neutral.x999, },
    },
    light: {
      color: theme.colors.neutral.x100,
      hover: { color: theme.colors.neutral.x050, },
      focus: { color: theme.colors.neutral.x000, },
    },
  };
  const currentColorSet = currentColorMapBy[colorVariant] || {
    color: theme.colors[colorVariant].x500,
    hover: {
      color: theme.colors[colorVariant].x400,
    },
    focus: {
      color: theme.colors[colorVariant].x600,
    },
  };

  const linkProps = {
    ref: ref,
    styleSheet: {
      textDecoration: 'none',
      color: 'inherit',
      ...colorVariantEnabled && {
        color: currentColorSet.color,
        hover: currentColorSet.hover,
        focus: currentColorSet.focus,
      },
      ...styleSheet,
    },
    ...props,
    tag: "a",
    href,
  };

  if (href.startsWith('http')) return <Text {...linkProps} {...{ target: "_blank" }}>{children}</Text>

  return (
    <NextLink href={href} passHref>
      <Text {...linkProps}>
        {children}
      </Text>
    </NextLink>
  )
});

Link.defaultProps = {
  colorVariant: 'primary',
  colorVariantEnabled: true,
}
