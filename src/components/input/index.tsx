import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps) {
  return <TextInput {...rest} className="h-10 py-2 px-4 rounded" />;
}
