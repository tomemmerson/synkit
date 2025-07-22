import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";

interface CalendarWidgetProps {
  currentDate: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ currentDate }) => {
  const daysOfWeek = [
    { day: "M", status: "active" },
    { day: "T", status: "active" },
    { day: "W", status: "light" },
    { day: "F", status: null },
    { day: "S", status: "light" },
    { day: "M", status: null },
    { day: "S", status: "current" },
  ];

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "active":
        return "#FF6B6B";
      case "light":
        return "#90C695";
      case "current":
        return "#614178";
      default:
        return "transparent";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <View style={styles.dateNavigation}>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesomeIcon icon={faChevronLeft} size={16} color="#9294AC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesomeIcon icon={faChevronRight} size={16} color="#9294AC" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.calendar}>
        {daysOfWeek.map((item, index) => (
          <View key={index} style={styles.dayContainer}>
            <View
              style={[
                styles.dayButton,
                item.status === "current" && styles.currentDay,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  item.status === "current" && styles.currentDayText,
                ]}
              >
                {item.day}
              </Text>
            </View>
            {item.status && item.status !== "current" && (
              <View style={styles.dotsContainer}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                />
                {item.status === "active" && (
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: getStatusColor(item.status) },
                    ]}
                  />
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B2E46",
  },
  dateNavigation: {
    flexDirection: "row",
    gap: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    alignItems: "center",
    width: 40,
  },
  dayButton: {
    width: 40,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  currentDay: {
    backgroundColor: "#614178",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9294AC",
  },
  currentDayText: {
    color: "#FFFFFF",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default CalendarWidget;
