import React, { useRef, useEffect, useState, useCallback } from "react";
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

interface DayData {
  day: string;
  date: number;
  status: "current" | "active" | "light" | null;
  fullDate: Date;
}

interface WeekData {
  weekOffset: number;
  data: DayData[];
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ currentDate }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const lastScrollIndexRef = useRef<number>(2); // Track last scroll position with ref
  const screenWidth = Dimensions.get("window").width;
  const weekWidth = screenWidth - 32; // Account for container padding

  // State for managing weeks
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Window size - total number of weeks to keep loaded
  const WINDOW_SIZE = 5;

  // Helper function to format date for display
  const formatCurrentDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return `Today, ${date.toLocaleDateString("en-US", options)}`;
  };

  // Generate a single week of data
  const generateWeekData = useCallback(
    (weekOffset: number): WeekData => {
      // Get the start of the current week (Monday)
      const currentWeekStart = new Date(currentDate);
      const dayOfWeek = currentDate.getDay();
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, so 6 days from Monday
      currentWeekStart.setDate(currentDate.getDate() - daysFromMonday);

      // Calculate the specific week
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() + weekOffset * 7);

      const week: DayData[] = [];
      const dayAbbreviations = ["M", "T", "W", "T", "F", "S", "S"];

      for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);

        let status: DayData["status"] = null;

        // Check if it's today
        if (day.toDateString() === currentDate.toDateString()) {
          status = "current";
        } else if (day < currentDate) {
          // Simple past date logic
          const dayHash = day.getDate() % 4;
          if (dayHash === 1) status = "active";
          else if (dayHash === 2) status = "light";
        }

        week.push({
          day: dayAbbreviations[i],
          date: day.getDate(),
          status,
          fullDate: day,
        });
      }

      return { weekOffset, data: week };
    },
    [currentDate]
  );

  // Initialize weeks data
  useEffect(() => {
    const initialWeeks: WeekData[] = [];

    // Generate 5 weeks: 2 before, current, 2 after
    for (let i = -2; i <= 2; i++) {
      initialWeeks.push(generateWeekData(i));
    }

    setWeeks(initialWeeks);
    setIsInitialized(true);
  }, [generateWeekData]);

  // Scroll to current week on initialization
  useEffect(() => {
    if (isInitialized && scrollViewRef.current) {
      // Current week is always at index 2 (middle of 5 weeks)
      scrollViewRef.current.scrollTo({
        x: 2 * weekWidth,
        animated: false,
      });
    }
  }, [isInitialized, weekWidth]);

  // Handle scroll events with sliding window
  const handleScroll = useCallback(
    (event: any) => {
      const { contentOffset } = event.nativeEvent;
      const scrollPosition = contentOffset.x;
      const currentIndex = Math.round(scrollPosition / weekWidth);
      const direction = currentIndex > lastScrollIndexRef.current ? 1 : -1; // 1 = right, -1 = left

      // console.log(event.nativeEvent);
      console.log({
        currentIndex,
        lastScrollIndex: lastScrollIndexRef.current,
        offset: contentOffset.x,
        weekWidth,
        direction,
      });

      // Only update if the index has changed
      if (currentIndex !== lastScrollIndexRef.current) {
        setWeeks((prevWeeks) => {
          if (direction > 0) {
            // Scrolling right - add week to end, remove from beginning
            const lastWeekOffset = prevWeeks[prevWeeks.length - 1].weekOffset;
            const newWeek = generateWeekData(lastWeekOffset + 1);
            return [...prevWeeks.slice(1), newWeek];
          } else {
            // Scrolling left - add week to beginning, remove from end
            const firstWeekOffset = prevWeeks[0].weekOffset;
            const newWeek = generateWeekData(firstWeekOffset - 1);
            return [newWeek, ...prevWeeks.slice(0, -1)];
          }
        });

        lastScrollIndexRef.current = currentIndex;
      }
    },
    [weekWidth, generateWeekData]
  );

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
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {weeks.map((week, weekIndex) => (
          <View
            key={`week-${week.weekOffset}`}
            style={[styles.calendar, { width: weekWidth }]}
          >
            {week.data.map((item: DayData, dayIndex: number) => (
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
