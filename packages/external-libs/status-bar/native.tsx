import { StatusBarProps } from './types';
import { StatusBar as Example } from 'expo-status-bar';

export function StatusBar({ style }: StatusBarProps) {
  return (
    <Example style={style} />
  );
}
