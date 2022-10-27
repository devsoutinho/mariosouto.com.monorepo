import * as icons from './icons/_index';
import { StyleSheet } from "@src/ui-system/theme/StyleSheet";
import BaseComponent from "@src/ui-system/theme/BaseComponent";

const iconSizes = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '36px',
} as const;

interface IconProps {
  name: keyof typeof icons;
  styleSheet?: StyleSheet;
  size?: keyof typeof iconSizes;
}
export function Icon({ name, styleSheet, size, ...props }: IconProps) {
  const IconPath = icons[name]
    ? icons[name]
    : icons.default_icon;
  return (
    <BaseComponent
      styleSheet={{
        width: iconSizes[size],
        height: iconSizes[size],
        ...styleSheet,
      }}
      as="svg"
      viewBox="0 0 24 24"
      color="inherit"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <IconPath />
    </BaseComponent>
  )
}

Icon.defaultProps = {
  name: 'default_icon',
  size: 'md',
};
