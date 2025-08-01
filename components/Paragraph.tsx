import React from "react";
import { Text, TextStyle, StyleProp } from "react-native";

interface ParagraphProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, style }) => {
  return <Text style={[defaultStyles, style]}>{children}</Text>;
};

const defaultStyles: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
  color: "#A184AB",
};

export default Paragraph;
