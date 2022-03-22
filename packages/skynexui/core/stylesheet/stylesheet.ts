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
type ObjectFit = 'fill' | 'contain' | 'cover';

export interface StyleSheet {
  // Setup
  cursor?: ResponsiveProperty<Cursor> | Cursor;
  overflow?: ResponsiveProperty<Overflow> | Overflow;
  // Layout Size
  width?: ResponsiveProperty<DefaultValue> | DefaultValue;
  maxWidth?: ResponsiveProperty<DefaultValue> | DefaultValue;
  minWidth?: ResponsiveProperty<DefaultValue> | DefaultValue;
  height?: ResponsiveProperty<DefaultValue> | DefaultValue;
  maxHeight?: ResponsiveProperty<DefaultValue> | DefaultValue;
  minHeight?: ResponsiveProperty<DefaultValue> | DefaultValue;
  margin?: ResponsiveProperty<DefaultValue> | DefaultValue;
  marginBottom?: ResponsiveProperty<DefaultValue> | DefaultValue;
  marginTop?: ResponsiveProperty<DefaultValue> | DefaultValue;
  marginLeft?: ResponsiveProperty<DefaultValue> | DefaultValue;
  marginRight?: ResponsiveProperty<DefaultValue> | DefaultValue;
  padding?: ResponsiveProperty<DefaultValue> | DefaultValue;
  paddingBottom?: ResponsiveProperty<DefaultValue> | DefaultValue;
  paddingTop?: ResponsiveProperty<DefaultValue> | DefaultValue;
  paddingLeft?: ResponsiveProperty<DefaultValue> | DefaultValue;
  paddingRight?: ResponsiveProperty<DefaultValue> | DefaultValue;
  // Layout Style
  aspectRatio?: ResponsiveProperty<DefaultValue> | DefaultValue;
  color?: ResponsiveProperty<string> | string;
  backgroundColor?: ResponsiveProperty<string> | string;
  objectFit?: ResponsiveProperty<ObjectFit> | ObjectFit;
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
