
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Text } from '../text/text';
import { TouchableArea } from '../touchablearea/touchablearea';
import { useRouter } from '../provider/provider';

interface ButtonProps {
  label: string;
  href?: string;
  target?: '_blank' | '_self';
  onPress?: () => void;
  styleSheet?: StyleSheet;
}
export function Button({ label, styleSheet, href, onPress, ...props }: ButtonProps) {
  const router = useRouter();
  const isLink = Boolean(href);
  const tag = isLink
    ? 'a'
    : 'button';

  return (
    <TouchableArea
      tag={tag}
      href={href}
      onPress={() => {
        isLink && router.push(href as any);
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
