import { Theme } from '../../core/theme/defaultTheme';

export const buttonVariantToStyle = {
  primary: 'filled',
  secondary: 'outlined',
  tertiary: 'ghost',
} as const;

interface ButtonColorValues {
  mainColor: string;
  mainColorStrong: string;
  mainColorLight: string;
  contrastColor: string;
}
export const buttonStyles = {
  filled: ({
    mainColor,
    contrastColor,
    mainColorStrong,
  }: ButtonColorValues) => ({
    backgroundColor: mainColor,
    borderColor: mainColor,
    color: contrastColor,
    hover: {
      backgroundColor: mainColorStrong,
    },
    focus: {
      backgroundColor: mainColorStrong,
    },
  }),
  outlined: ({ mainColor, contrastColor }: ButtonColorValues) => ({
    color: mainColor,
    border: '1px solid',
    borderColor: mainColor,
    backgroundColor: 'transparent',
    hover: {
      color: contrastColor,
      backgroundColor: mainColor,
    },
    focus: {
      color: contrastColor,
      backgroundColor: mainColor,
    },
  }),
  ghost: ({ mainColor, mainColorLight, contrastColor }: ButtonColorValues) => ({
    color: mainColor,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    hover: {
      color: contrastColor,
      backgroundColor: mainColorLight,
    },
    focus: {
      color: contrastColor,
      backgroundColor: mainColorLight,
    },
  }),
} as const;

export const buttonSizes = {
  xs: (theme: Theme) => ({
    textVariant: 'body4',
    paddingHorizontal: theme.space?.['x2/5'],
    paddingVertical: theme.space?.['x2/5'],
  }),
  sm: (theme: Theme) => ({
    textVariant: 'body3',
    paddingHorizontal: theme.space?.x3,
    paddingVertical: theme.space?.x2,
  }),
  md: (theme: Theme) => ({
    textVariant: 'body3',
    paddingHorizontal: theme.space?.x4,
    paddingVertical: theme.space?.x2,
  }),
  lg: (theme: Theme) => ({
    textVariant: 'body2',
    paddingHorizontal: theme.space?.x4,
    paddingVertical: theme.space?.x2,
  }),
  xl: (theme: Theme) => ({
    textVariant: 'body2',
    paddingHorizontal: theme.space?.x6,
    paddingVertical: theme.space?.x3,
  }),
};
