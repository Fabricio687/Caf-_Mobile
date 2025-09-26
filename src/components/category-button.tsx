import { Text, Pressable, PressableProps } from "react-native";

import { clsx } from "clsx";

type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={clsx("px-4 justify-center h-10 border-b-2 border-gray-200", {
        "border-orange-500": isSelected,
      })}
      {...rest}
    >
      <Text className={clsx("font-medium text-sm", {
        "text-orange-500 font-bold": isSelected,
        "text-gray-500": !isSelected,
      })}>{title}</Text>
    </Pressable>
  );
}
