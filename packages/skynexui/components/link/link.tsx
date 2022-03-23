import { useRouter } from '../provider/provider';
import { TouchableArea } from '../touchablearea/touchablearea';
import { Text, TextProps } from '../text/text';

interface LinkProps {
  href: string;
  children: string;
  textProps?: Partial<TextProps>;
}
export function Link({ href, children, textProps, ...props }: LinkProps) {
  const router = useRouter();
  const url = href;

  return (
    <TouchableArea
      tag='a'
      onPress={() => {
        router.push(url);
      }}
    >
      <Text {...textProps}>
        {children}
      </Text>
    </TouchableArea>
  );
}
