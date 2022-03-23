
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
        ...styleSheet,
      }}
    >
      <Text
        tag={"span"}
        styleSheet={{
          color: styleSheet?.color,
        }}
      >
        {label}
      </Text>
    </TouchableArea>
  )
}
