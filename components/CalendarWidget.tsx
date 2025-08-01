import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";

interface CalendarWidgetProps {
  selectedDate: Date;
  onClick?: (date: Date) => void;
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

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  selectedDate,
  onClick,
}) => {
  const todaysDate = new Date();

  // Window size - total number of weeks to keep loaded
  const WINDOW_SIZE = 6;

  const scrollViewRef = useRef<ScrollView>(null);
  const lastScrollIndexRef = useRef<number>(Math.floor(WINDOW_SIZE / 2)); // Track last scroll position with ref
  const isAdjustingScrollRef = useRef<boolean>(false); // Prevent overlapping scroll adjustments
  const screenWidth = Dimensions.get("window").width;
  const weekWidth = screenWidth; // Account for container padding

  // State for managing weeks
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper function to format date for display
  const formatSelectedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return `${date.toLocaleDateString("en-US", options)}`;
  };

  // Generate a single week of data
  const generateWeekData = useCallback(
    (weekOffset: number): WeekData => {
      // Get the start of the current week (Monday)
      const currentWeekStart = new Date(todaysDate);
      const dayOfWeek = todaysDate.getDay();
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, so 6 days from Monday
      currentWeekStart.setDate(todaysDate.getDate() - daysFromMonday);

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
        if (day.toDateString() === todaysDate.toDateString()) {
          status = "current";
        } else if (day < todaysDate) {
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
    [todaysDate.getUTCDate()]
  );

  // Initialize weeks data
  useEffect(() => {
    const initialWeeks: WeekData[] = [];

    // Generate WINDOW_SIZE weeks: all in the past and current week, no future weeks
    // Start from -(WINDOW_SIZE-1) and go to 0 (current week)
    for (let i = -(WINDOW_SIZE - 1); i <= 0; i++) {
      initialWeeks.push(generateWeekData(i));
    }

    setWeeks(initialWeeks);
    setIsInitialized(true);
  }, [generateWeekData, WINDOW_SIZE]);

  // Scroll to current week on initialization
  useEffect(() => {
    if (isInitialized && scrollViewRef.current) {
      // Current week is now at the last position (WINDOW_SIZE - 1)
      const currentWeekIndex = WINDOW_SIZE - 1;
      scrollViewRef.current.scrollTo({
        x: currentWeekIndex * weekWidth,
        animated: false,
      });
      lastScrollIndexRef.current = currentWeekIndex;
    }
  }, [isInitialized, weekWidth, WINDOW_SIZE]);

  // Handle scroll end events with sliding window
  const handleScrollEnd = useCallback(
    (event: any) => {
      // Prevent overlapping scroll adjustments
      if (isAdjustingScrollRef.current) {
        console.log("Scroll adjustment in progress, ignoring");
        return;
      }

      const { contentOffset } = event.nativeEvent;
      const scrollPosition = contentOffset.x;
      const currentIndex = Math.round(scrollPosition / weekWidth);

      // Only trigger sliding window when at the left edge (index 0)
      // We don't allow scrolling to the right past the current week
      const isAtLeftEdge = currentIndex === 0;

      if (currentIndex !== lastScrollIndexRef.current && isAtLeftEdge) {
        isAdjustingScrollRef.current = true;

        console.log("Triggered sliding window: left edge");

        setWeeks((prevWeeks) => {
          // Scrolling left - add week to beginning, remove from end
          const firstWeekOffset = prevWeeks[0].weekOffset;
          const newWeek = generateWeekData(firstWeekOffset - 1);
          const newWeeks = [newWeek, ...prevWeeks.slice(0, -1)];
          console.log(
            "New weeks after scrolling left:",
            newWeeks.map((w) => w.weekOffset)
          );
          return newWeeks;
        });

        // Adjust scroll position to maintain visual continuity
        setTimeout(() => {
          if (scrollViewRef.current && isAdjustingScrollRef.current) {
            // When scrolling left and hitting the left edge,
            // we added to the beginning and removed from the end
            // User should move to position 1 (since we added a week at the beginning)
            const adjustedScrollPosition = 1 * weekWidth;

            console.log(
              "Adjusting scroll position:",
              adjustedScrollPosition,
              `(index: ${adjustedScrollPosition / weekWidth})`
            );

            scrollViewRef.current.scrollTo({
              x: adjustedScrollPosition,
              animated: false,
            });

            // Update refs after scroll adjustment
            lastScrollIndexRef.current = Math.round(
              adjustedScrollPosition / weekWidth
            );
            isAdjustingScrollRef.current = false;
          }
        }, 10);
      } else {
        // Just update the ref for normal scrolling within the safe range
        lastScrollIndexRef.current = currentIndex;
      }
    },
    [weekWidth, generateWeekData, WINDOW_SIZE]
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
        <Pressable
          onPress={() => {
            if (onClick) {
              onClick(todaysDate);
              // scroll to the current week
              scrollViewRef.current?.scrollTo({
                x: (WINDOW_SIZE - 1) * weekWidth,
                animated: true,
              });
            }
          }}
        >
          <Text style={styles.headerDateText}>
            {formatSelectedDate(selectedDate)}
          </Text>
        </Pressable>
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
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {weeks.map((week, weekIndex) => (
          <View
            key={`week-${week.weekOffset}`}
            style={[styles.calendar, { width: weekWidth }]}
          >
            {week.data.map((item: DayData, dayIndex: number) => (
              <TouchableOpacity
                key={dayIndex}
                style={styles.dayContainer}
                onPress={() => {
                  if (onClick) {
                    console.log("Clicked date:", item.fullDate);
                    onClick(item.fullDate);
                  }
                }}
              >
                <View
                  style={[
                    styles.dayButton,
                    item.date === selectedDate.getDate() && styles.currentDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      item.date === selectedDate.getDate() &&
                        styles.currentDayText,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      item.date === selectedDate.getDate() &&
                        styles.selectedDateText,
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
    paddingVertical: 10,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
  },
  dayContainer: {
    alignItems: "center",
    width: 45,
  },
  dayButton: {
    width: 45,
    height: 85,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    paddingVertical: 8,
  },
  currentDay: {
    backgroundColor: "#614178",
    borderWidth: 2,
    borderColor: "#4B325C",
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
  selectedDateText: {
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
