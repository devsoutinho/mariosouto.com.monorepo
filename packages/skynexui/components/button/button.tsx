
import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { useEnv } from '../provider/provider';
import { Text } from '../text/text';

const StyledButton = styled.TouchableOpacity || (styled as any).button;
const ButtonStyled = StyledButton`
  background: transparent;
  border: none;
`;
interface ButtonProps {
  label: string;
  onTap?: () => void;
  styleSheet?: StyleSheet;
}
export function Button({ label, styleSheet, onTap, ...props }: ButtonProps) {
  const { isWeb } = useEnv();
  const isWebEnv = isWeb();
  const isMobileEnv = !isWebEnv;

  return (
    <ButtonStyled
      {...isMobileEnv && {
        onPress: onTap,
      }}
      {...isWebEnv && {
        onClick: onTap,
      }}
    >
      <Text styleSheet={styleSheet}>
        {label}
      </Text>
    </ButtonStyled>
  )
}
