import { TextInput, TextInputProps } from "react-native";

import colors from "tailwindcss/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.gray[400]}
      className="h-32 bg-gray-100 rounded-md px-4 py-3 font-body text-sm text-gray-800"
      {...rest}
    />
  );
}
