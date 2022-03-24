import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { useTheme } from '../provider/provider';
import { Text } from '../text/text';
import { TouchableArea } from '../touchablearea/touchablearea';
import { buttonVariantToStyle } from './theme';

// https://github.com/skynexui/components/blob/main/lib/components/button/button.tsx

interface ButtonProps {
  label: string;
  href?: string;
  variant?: keyof typeof buttonVariantToStyle;
  target?: '_blank' | '_self';
  onPress?: () => void;
  styleSheet?: StyleSheet;
}
export function Button({ label, styleSheet, onPress, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <TouchableArea
      onPress={() => {
        onPress && onPress();
      }}
      {...props}
      styleSheet={{
        boxShadow: theme.shadow?.sm,
        textDecoration: 'none',
        backgroundColor: '#f00',
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
