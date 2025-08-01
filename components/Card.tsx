import React from "react";
import { View, StyleSheet } from "react-native";

interface CardProps {
  children?: React.ReactNode;
  style?: object;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 29,
    padding: 16,
  },
});

export default Card;
