import React from "react";
import { Text, StyleSheet } from "react-native";

interface SubheadingProps {
  children: React.ReactNode;
  style?: object;
}

const Subheading: React.FC<SubheadingProps> = ({ children, style }) => {
  return <Text style={[styles.subheading, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  subheading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#614178",
    marginBottom: 16,
  },
});

export default Subheading;
