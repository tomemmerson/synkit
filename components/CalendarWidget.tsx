import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";

interface CalendarWidgetProps {
  currentDate: Date;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ currentDate }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get("window").width;
  const weekWidth = screenWidth - 32; // Account for container padding

  // Helper function to get day abbreviation
  const getDayAbbr = (dayIndex: number) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[dayIndex];
  };

  // Helper function to format date for display
  const formatCurrentDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return `Today, ${date.toLocaleDateString("en-US", options)}`;
  };

  // Generate multiple weeks of data for horizontal scrolling
  const generateWeeksData = () => {
    const weeks = [];

    // Get the start of the current week (Sunday)
    const currentWeekStart = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    currentWeekStart.setDate(currentDate.getDate() - dayOfWeek);

    // Generate 3 weeks: previous, current, next
    for (let weekOffset = -1; weekOffset <= 1; weekOffset++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() + weekOffset * 7);

      const week = [];
      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + dayOffset);

        // Determine status (this is sample data - you can customize this logic)
        let status = null;
        const today = new Date(currentDate);

        if (day.toDateString() === today.toDateString()) {
          status = "current";
        } else if (day < today) {
          // Past dates - random sample data
          const random = Math.random();
          if (random < 0.3) status = "active";
          else if (random < 0.5) status = "light";
        }

        week.push({
          day: getDayAbbr(day.getDay()),
          date: day.getDate(),
          status: status,
          fullDate: day,
        });
      }
      weeks.push(week);
    }

    return weeks;
  };

  const weeksData = generateWeeksData();

  // Scroll to current week on mount
  useEffect(() => {
    if (scrollViewRef.current) {
      // Scroll to the middle week (current week) - index 1
      scrollViewRef.current.scrollTo({
        x: weekWidth,
        animated: false,
      });
    }
  }, [weekWidth]);

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
        <Text style={styles.headerDateText}>
          {formatCurrentDate(currentDate)}
        </Text>
        <View style={styles.dateNavigation}>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesomeIcon icon={faChevronLeft} size={16} color="#9294AC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <FontAwesomeIcon icon={faChevronRight} size={16} color="#9294AC" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={weekWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContainer}
        style={styles.calendarScroll}
      >
        {weeksData.map((week, weekIndex) => (
          <View key={weekIndex} style={[styles.calendar, { width: weekWidth }]}>
            {week.map((item, dayIndex) => (
              <TouchableOpacity key={dayIndex} style={styles.dayContainer}>
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
                  <Text
                    style={[
                      styles.dateText,
                      item.status === "current" && styles.currentDateText,
                    ]}
                  >
                    {item.date}
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
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
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
  headerDateText: {
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
  calendarScroll: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: 0,
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  dayContainer: {
    alignItems: "center",
    width: 45,
  },
  dayButton: {
    width: 45,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    paddingVertical: 8,
  },
  currentDay: {
    backgroundColor: "#614178",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9294AC",
    marginBottom: 4,
  },
  currentDayText: {
    color: "#FFFFFF",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B2E46",
  },
  currentDateText: {
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
