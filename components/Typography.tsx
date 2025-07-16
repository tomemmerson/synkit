import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

type TypographyProps = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold" | "extralight";
};

const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  weight = "regular",
}) => {
  const fontStyles = {
    extralight: styles.extralight,
    light: styles.light,
    regular: styles.regular,
    medium: styles.medium,
    semiBold: styles.semiBold,
    bold: styles.bold,
  };

  return (
    <Text style={[styles.defaultStyle, fontStyles[weight], style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: "#2A2D46",
  },
  extralight: {
    fontFamily: "Poppins_200ExtraLight",
  },
  light: {
    fontFamily: "Poppins_300Light",
  },
  regular: {
    fontFamily: "Poppins_400Regular",
  },
  medium: {
    fontFamily: "Poppins_500Medium",
  },
  semiBold: {
    fontFamily: "Poppins_600SemiBold",
  },
  bold: {
    fontFamily: "Poppins_700Bold",
  },
});

export default Typography;
