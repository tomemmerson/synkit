import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type SingleTipProps = {
  title: string;
  subtitle: string;
  color: string;
  icon: IconDefinition;
  onPress?: () => void;
};

type DoubleTipProps = {
  nutritionTip: string;
  productivityTip: string;
  subtitle: string;
  color: string;
  nutritionIcon: IconDefinition;
  productivityIcon: IconDefinition;
  onPress?: () => void;
};

type Props = SingleTipProps | DoubleTipProps;

function isSingleTip(props: Props): props is SingleTipProps {
  return "title" in props;
}

function TipCard(props: Props) {
  if (isSingleTip(props)) {
    const { title, subtitle, color, icon, onPress } = props;
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: color }]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={!onPress}
      >
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={icon} size={20} color="#FFFFFF" />
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const {
    nutritionTip,
    productivityTip,
    subtitle,
    color,
    nutritionIcon,
    productivityIcon,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.content}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.tipRow}>
          <View style={styles.tipIconContainer}>
            <FontAwesomeIcon icon={nutritionIcon} size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.tipText}>{nutritionTip}</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipIconContainer}>
            <FontAwesomeIcon
              icon={productivityIcon}
              size={16}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.tipText}>{productivityTip}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 18,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  tipIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 18,
  },
});

export default TipCard;
