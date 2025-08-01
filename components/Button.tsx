import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  style?: object;
  round?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  style,
  round = false,
}) => {
  return (
    <Pressable
      style={[
        disabled && styles.disabledButton,
        styles[variant],
        style,
        round && { borderRadius: 50 },
      ]}
      onPress={!disabled ? onPress : undefined}
    >
      <Text style={[styles[`${variant}Text`], disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: "#614178",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  secondary: {
    backgroundColor: "#EFECF0",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    // width: "100%",
  },
  disabledButton: {
    backgroundColor: "#B7B7B7",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#5F2E71",
    fontSize: 16,
    fontWeight: "400",
  },
  disabledText: {
    color: "#E0E0E0",
  },
});

export default Button;
