import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={!disabled ? onPress : undefined}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#614178",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  disabledButton: {
    backgroundColor: "#B7B7B7",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#E0E0E0",
  },
});

export default Button;
