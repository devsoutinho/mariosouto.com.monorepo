import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { BoxBase } from '../box/box-base';
import { useEnv, useRouter } from '../provider/provider';

// TODO: Add cursor support;
// cursor: pointer;

const StyledTouchable = styled.TouchableOpacity || (styled as any).button;
const TouchableStyled = StyledTouchable``;
interface TouchableProps {
  href?: string;
  target?: '_blank' | '_self';
  disabled?: boolean;
  onPress?: () => void;
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
  [key: string]: any;
}
export function TouchableArea({ children, styleSheet, href, onPress, ...props }: TouchableProps) {
  const router = useRouter();
  const { isWeb } = useEnv();
  const isLink = Boolean(href);
  const tag = isLink
    ? 'a'
    : 'button';
  const isWebEnv = isWeb();
  const isMobileEnv = !isWebEnv;

  function handleOnPress() {
    if(!props.disabled) {
      onPress && onPress();
      isLink && router.push(href as any);
    }
  }

  return (
    <BoxBase
      as={TouchableStyled}
      tag={tag}
      activeOpacity={1}
      styleSheet={{
        border: 'none',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        cursor: 'pointer',
        alignItems: 'flex-start',
        ...(isWeb() && {
          outline: '0',
        }),
        ...styleSheet,
      }}
      {...isMobileEnv && {
        onPress: handleOnPress,
      }}
      {...isWebEnv && {
        onClick: handleOnPress,
      }}
      {...props}
    >
      {children}
    </BoxBase>
  )
}
