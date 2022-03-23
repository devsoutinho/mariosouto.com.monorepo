import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { BoxBase } from '../box/box-base';
import { useEnv } from '../provider/provider';

// TODO: Add cursor support;
// cursor: pointer;

const StyledTouchable = styled.TouchableOpacity || (styled as any).button;
const TouchableStyled = StyledTouchable`
  background: transparent;
  border: none;
`;
interface TouchableProps {
  tag?: string;
  onPress?: () => void;
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
}
export function TouchableArea({ children, styleSheet, onPress, ...props }: TouchableProps) {
  const { isWeb } = useEnv();
  const isWebEnv = isWeb();
  const isMobileEnv = !isWebEnv;

  return (
    <BoxBase
      as={TouchableStyled}
      styleSheet={{
        cursor: 'pointer',
        alignItems: 'flex-start',
        ...styleSheet,
      }}
      {...isMobileEnv && {
        onPress: onPress,
      }}
      {...isWebEnv && {
        onClick: onPress,
      }}
      {...props}
    >
      {children}
    </BoxBase>
  )
}
