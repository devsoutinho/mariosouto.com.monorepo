import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

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
