
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Text } from '../text/text';
import { TouchableArea } from '../touchablearea/touchablearea';

interface ButtonProps {
  label: string;
  href?: string;
  target?: '_blank' | '_self';
  onPress?: () => void;
  styleSheet?: StyleSheet;
}
export function Button({ label, styleSheet, onPress, ...props }: ButtonProps) {
  return (
    <TouchableArea
      onPress={() => {
        onPress && onPress();
      }}
      {...props}
      styleSheet={{
        textDecoration: 'none',
        backgroundColor: '#fff',
        ...styleSheet,
      }}
    >
      <Text
        tag={"span"}
        styleSheet={{
          color: '#000',
        }}
      >
        {label}
      </Text>
    </TouchableArea>
  )
}
