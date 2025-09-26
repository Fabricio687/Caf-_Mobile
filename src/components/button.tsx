import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
};

type ButtonTextProps = {
  children: ReactNode;
};

type ButtonIconProps = {
  children: ReactNode;
};

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={`py-4 px-6 rounded-xl items-center justify-center flex-row ${className || 'bg-orange-500'}`}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children, className }: ButtonTextProps & { className?: string }) {
  return (
    <Text className={`font-semibold text-base ${className || 'text-white'}`}>{children}</Text>
  );
}

function ButtonIcon({ children }: ButtonProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
