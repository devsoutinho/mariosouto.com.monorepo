import { useTheme as useThemeStyled } from 'styled-components';
import { Theme } from './theme';

export default function useTheme(): Theme {
  return useThemeStyled() as unknown as any;
}
