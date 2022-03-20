import { Breakpoints } from '../breakpoints/breakpoints';

export type ResponsiveProperty<Type> = Partial<Record<Breakpoints, Type>>;

type JustifyContent = 'center'
  | 'flex-start'
  | 'flex-end'
  | 'spaceBetween'
  | 'spaceAround'
  | 'spaceEvenly';

type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center';

export interface StyleSheet {
  color?: ResponsiveProperty<string> | string;
  backgroundColor?: ResponsiveProperty<string> | string;
  flex?: ResponsiveProperty<string> | string | number;
  alignItems?: ResponsiveProperty<AlignItems> | AlignItems;
  justifyContent?: ResponsiveProperty<JustifyContent> | JustifyContent;
}
