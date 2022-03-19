import styled from 'styled-components/native';

const Text = styled.Text`
  background: blue;
  border-width: 5px;
  border-color: red;
`;
const TouchableOpacity = styled.TouchableOpacity`
`;
interface IButtonProps {
  label: string;
}
export const Button = ({ label }: IButtonProps) => {
  return (
    <TouchableOpacity>
      <Text>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
