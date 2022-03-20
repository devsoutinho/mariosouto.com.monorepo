import { StyleSheet } from '../../../core/stylesheet/stylesheet';

interface ParseCSSInput {
  styleSheet: StyleSheet;
}
export function parseCSS({ styleSheet }: ParseCSSInput): any {
  return {
    ...styleSheet,
  };
}
