import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faPlus } from "@fortawesome/pro-light-svg-icons";
import { faDroplet } from "@fortawesome/pro-solid-svg-icons";

interface StatusCardProps {
  type: "period" | "mood" | "workout";
  title: string;
  subtitle?: string;
  status?: "completed" | "add";
  color: string;
  onPress?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  type,
  title,
  subtitle,
  status,
  color,
  onPress,
}) => {
  const renderIcon = () => {
    switch (type) {
      case "period":
        return <FontAwesomeIcon icon={faDroplet} size={24} color="#FFFFFF" />;
      case "mood":
        return <Text style={styles.moodEmoji}>😊</Text>;
      case "workout":
        return <Text style={styles.workoutEmoji}>🏋️</Text>;
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (status === "completed") {
      return (
        <View style={styles.completedButton}>
          <FontAwesomeIcon icon={faCheck} size={16} color="#FFFFFF" />
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
      onPress={onPress}
    >
      <View style={styles.header}>
        {renderIcon()}
        {renderActionButton()}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  completedButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  moodEmoji: {
    fontSize: 24,
  },
  workoutEmoji: {
    fontSize: 20,
  },
});

export default StatusCard;
