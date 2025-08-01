import React from "react";
import { Text, StyleSheet } from "react-native";

interface HeadingProps {
  children: React.ReactNode;
  style?: object;
}

const Heading: React.FC<HeadingProps> = ({ children, style }) => {
  return <Text style={[styles.greeting, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 32,
    fontWeight: "700",
    color: "#614178",
    marginBottom: 4,
  },
});

export default Heading;
