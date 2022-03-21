import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { useEnv } from '../provider/provider';
import { Text } from '../text/text';

const StyledTouchable = styled.TouchableOpacity || (styled as any).button;
const TouchableStyled = StyledTouchable`
  background: transparent;
  border: none;
`;
interface TouchableProps {
  onPress?: () => void;
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
}
export function TouchableArea({ children, styleSheet, onPress, ...props }: TouchableProps) {
  const { isWeb } = useEnv();
  const isWebEnv = isWeb();
  const isMobileEnv = !isWebEnv;

  return (
    <TouchableStyled
      {...isMobileEnv && {
        onPress: onPress,
      }}
      {...isWebEnv && {
        onClick: onPress,
      }}
      {...props}
    >
      {children}
    </TouchableStyled>
  )
}
