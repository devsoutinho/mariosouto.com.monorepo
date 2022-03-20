import { Breakpoints } from '../theme/breakpoints/breakpoints';

export type ResponsiveProperty<Type> = Partial<Record<Breakpoints, Type>>;

type JustifyContent = 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center';
type Position = 'relative' | 'absolute' | 'fixed';
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export interface StyleSheet {
  // Layout Size
  width?: ResponsiveProperty<string> | string;
  height?: ResponsiveProperty<string> | string;
  margin?: ResponsiveProperty<string> | string;
  padding?: ResponsiveProperty<string> | string;
  // Layout Style
  color?: ResponsiveProperty<string> | string;
  backgroundColor?: ResponsiveProperty<string> | string;
  // Flex Values
  flex?: ResponsiveProperty<string> | string | number;
  flexDirection?: ResponsiveProperty<FlexDirection> | FlexDirection;
  alignItems?: ResponsiveProperty<AlignItems> | AlignItems;
  justifyContent?: ResponsiveProperty<JustifyContent> | JustifyContent;
  // Position Values
  position?: ResponsiveProperty<Position> | Position;
  top?: ResponsiveProperty<string> | string;
  left?: ResponsiveProperty<string> | string;
  right?: ResponsiveProperty<string> | string;
  bottom?: ResponsiveProperty<string> | string;
  [key: string]: any;
}

export type StyleKey = keyof StyleSheet;
