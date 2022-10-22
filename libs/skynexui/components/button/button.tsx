import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { defaultBorderRadius } from '../../core/theme/borderRadius/borderRadius';
import { useTheme } from '../provider/provider';
import { Text } from '../text/text';
import { Box } from '../box/box';
import { TouchableArea } from '../touchablearea/touchablearea';
import { buttonVariantToStyle, buttonStyles, buttonSizes } from './theme';

// https://github.com/skynexui/components/blob/main/lib/components/button/button.tsx
interface ButtonColorValues {
  mainColor: string;
  mainColorStrong: string;
  mainColorLight: string;
  contrastColor: string;
}

interface ButtonProps {
  label: string;
  href?: string;
  disabled?: boolean;
  rounded?: keyof typeof defaultBorderRadius;
  size?: keyof typeof buttonSizes;
  variant?: keyof typeof buttonVariantToStyle;
  target?: '_blank' | '_self';
  onPress?: () => void;
  styleSheet?: StyleSheet;
  buttonColors?: ButtonColorValues;
  colorVariant?:
  | 'primary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'dark'
  | 'light';
}
export function Button({ label, styleSheet, buttonColors, ...props }: ButtonProps) {
  const theme = useTheme();
  const {
    defaultVariant,
    size: defaultSize,
    rounded: defaultRounded,
    colorVariant: defaultColorVariant,
  } = theme.components?.button || {};
  const colorVariant = props.colorVariant || defaultColorVariant || 'primary';
  const variant = props.variant || defaultVariant || 'primary';
  const rounded = props.rounded || defaultRounded || 'none';
  const size = props.size || defaultSize || 'md';

  const { textVariant, ...buttonSize } = (buttonSizes as any)[size](theme);
  const opacityDisabled = 0.65;

  const colorSet = (() => {
    if (buttonColors) {
      return buttonColors;
    }

    if (colorVariant === 'dark') {
      return {
        mainColor: theme.colors?.neutral.x800,
        mainColorLight: theme.colors?.neutral.x700,
        mainColorStrong: theme.colors?.neutral.x900,
        contrastColor: theme.colors?.neutral.x000,
      };
    }

    if (colorVariant === 'light') {
      return {
        mainColor: theme.colors?.neutral.x100,
        mainColorLight: theme.colors?.neutral.x050,
        mainColorStrong: theme.colors?.neutral.x200,
        contrastColor: theme.colors?.neutral.x999,
      };
    }

    const currentColorVariant = (theme as any).colors[colorVariant as any];
    return {
      mainColor: currentColorVariant.x500,
      mainColorLight: currentColorVariant.x400,
      mainColorStrong: currentColorVariant.x600,
      contrastColor: theme.colors?.neutral.x000,
    };
  })();

  const buttonStyle = (buttonStyles as any)[(buttonVariantToStyle as any)[variant as any]](colorSet);

  return (
    <Box
      {...{
        opacity: props.disabled ? opacityDisabled : 1,
      }}
    >
      <TouchableArea
        {...props}
        styleSheet={{
          boxShadow: theme.shadow?.sm,
          textDecoration: 'none',
          backgroundColor: '#f00',
          borderRadius: theme.borderRadius?.[rounded],
          ...buttonSize,
          ...buttonStyle,
          ...styleSheet,
          disabled: {
            ...styleSheet?.disabled,
            backgroundColor: theme.colors?.neutral.x300,
            opacity: opacityDisabled,
          },
        }}
      >
        <Text
          tag={"span"}
          variant={textVariant}
          styleSheet={{
            color: buttonStyle.color,
            hover: {
              hover: buttonStyle.hover.color,
            },
            focus: {
              focus: buttonStyle.focus.color,
            },
          }}
        >
          {label}
          {` = `}
          {defaultVariant}
        </Text>
      </TouchableArea>
    </Box>
  )
}
