import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet, faCheck, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface StatusCardProps {
  type: string;
  icon: IconProp;
  title: string;
  subtitle?: string;
  status?: "completed" | "add";
  color: string;
  onPress?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  type,
  icon,
  title,
  subtitle,
  status,
  color,
  onPress,
}) => {
  const renderActionButton = () => {
    if (status === "completed") {
      return (
        <View style={styles.completedButton}>
          <FontAwesomeIcon icon={faCheck} size={16} color="#D4A5A5" />
        </View>
      );
    } else if (status === "add") {
      return (
        <TouchableOpacity style={styles.addButton}>
          <FontAwesomeIcon icon={faPlus} size={16} color="#FFFFFF" />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.cardNameContainer}>
          <Text style={styles.cardName}>{type}</Text>
        </View>
        {renderActionButton()}
      </View>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} size={35} color="#FFFFFF" />
      </View>
      {/* Bottom overlay for text */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 0,
    minHeight: 220,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1.5,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 0,
    zIndex: 2,
  },
  cardNameContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  cardName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  completedButton: {
    width: 32,
    height: 32,
    borderRadius: 13,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 13,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: -2,
    left: -2,
    right: -2,
    position: "absolute",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  iconContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
});

export default StatusCard;
