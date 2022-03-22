import { Breakpoints } from '../theme/breakpoints/breakpoints';

export type ResponsiveProperty<Type> = Partial<Record<Breakpoints, Type>>;

type DefaultValue = string | number | boolean;
type JustifyContent = 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center';
type Position = 'relative' | 'absolute' | 'fixed';
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type Cursor = 'default' | 'pointer' | 'text' | 'wait' | 'move' | 'not-allowed';
type Overflow = 'scroll' | 'hidden';
export interface StyleSheet {
  // Setup
  cursor?: ResponsiveProperty<Cursor> | Cursor;
  overflow?: ResponsiveProperty<Overflow> | Overflow;
  // Layout Size
  width?: ResponsiveProperty<string> | DefaultValue;
  height?: ResponsiveProperty<string> | DefaultValue;
  margin?: ResponsiveProperty<string> | DefaultValue;
  marginBottom?: ResponsiveProperty<string> | DefaultValue;
  marginTop?: ResponsiveProperty<string> | DefaultValue;
  marginLeft?: ResponsiveProperty<string> | DefaultValue;
  marginRight?: ResponsiveProperty<string> | DefaultValue;
  padding?: ResponsiveProperty<string> | DefaultValue;
  paddingBottom?: ResponsiveProperty<string> | DefaultValue;
  paddingTop?: ResponsiveProperty<string> | DefaultValue;
  paddingLeft?: ResponsiveProperty<string> | DefaultValue;
  paddingRight?: ResponsiveProperty<string> | DefaultValue;
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
