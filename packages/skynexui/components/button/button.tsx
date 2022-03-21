
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Text } from '../text/text';
import { TouchableArea } from '../touchablearea/touchablearea';
interface ButtonProps {
  label: string;
  onPress?: () => void;
  styleSheet?: StyleSheet;
}
export function Button({ label, styleSheet, ...props }: ButtonProps) {

  return (
    <TouchableArea
      {...props}
    >
      <Text tag={"span"} styleSheet={styleSheet}>
        {label}
      </Text>
    </TouchableArea>
  )
}
