import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Animated,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCalendarDays,
  faClock,
  faFire,
} from "@fortawesome/pro-regular-svg-icons";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import Paragraph from "@/components/Paragraph";
import Card from "@/components/Card";
import { useLogging, WorkoutCompletion } from "@/data/logging";

interface WorkoutHistoryItemProps {
  completion: WorkoutCompletion;
}

const WorkoutHistoryItem: React.FC<WorkoutHistoryItemProps> = ({
  completion,
}) => {
  const completionDate = new Date(completion.completedAt);
  const dateString = completionDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeString = completionDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const completionPercentage = Math.round(
    (completion.exercisesCompleted / completion.totalExercises) * 100
  );

  return (
    <Card style={styles.historyItem}>
      <View style={styles.historyItemHeader}>
        <View style={styles.historyItemTitleSection}>
          <Subheading style={styles.historyItemTitle}>
            {completion.workoutName}
          </Subheading>
          <View style={styles.historyItemMeta}>
            <View style={styles.metaItem}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                size={12}
                color="#A184AB"
                style={styles.metaIcon}
              />
              <Text style={styles.metaText}>{dateString}</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesomeIcon
                icon={faClock}
                size={12}
                color="#A184AB"
                style={styles.metaIcon}
              />
              <Text style={styles.metaText}>{timeString}</Text>
            </View>
          </View>
        </View>
        <View style={styles.historyItemStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completionPercentage}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
          {completion.duration && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completion.duration}m</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.historyItemFooter}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{completion.phase}</Text>
          </View>
          <View style={[styles.badge, styles.planBadge]}>
            <Text style={[styles.badgeText, styles.planBadgeText]}>
              {completion.planType} • {completion.planLevel}
            </Text>
          </View>
        </View>
        <Text style={styles.exerciseCount}>
          {completion.exercisesCompleted}/{completion.totalExercises} exercises
        </Text>
      </View>
    </Card>
  );
};

export default function WorkoutHistory() {
  const logging = useLogging();
  const workoutHistory = logging.getWorkoutHistory(90); // Get last 90 days
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const topBarOpacity = scrollY.interpolate({
    inputRange: [60, 120],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const topBarTranslateY = scrollY.interpolate({
    inputRange: [60, 120],
    outputRange: [-60, 0],
    extrapolate: "clamp",
  });

  // Group workouts by date
  const groupedHistory = workoutHistory.reduce((groups, completion) => {
    const date = new Date(completion.completedAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(completion);
    return groups;
  }, {} as Record<string, WorkoutCompletion[]>);

  const groupedData = Object.entries(groupedHistory).map(
    ([date, workouts]) => ({
      date,
      workouts,
    })
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Animated Top Bar */}
      <Animated.View
        style={[
          styles.topBar,
          {
            paddingTop: insets.top,
            height: 60 + insets.top,
            opacity: topBarOpacity,
            transform: [{ translateY: topBarTranslateY }],
          },
        ]}
      >
        <Text style={styles.topBarText}>Workout History</Text>
      </Animated.View>

      {/* History List */}
      {workoutHistory.length === 0 ? (
        <SafeAreaView
          style={styles.emptyStateContainer}
          edges={["top", "left", "right"]}
        >
          <View style={styles.emptyState}>
            <FontAwesomeIcon icon={faFire} size={48} color="#E5E5E5" />
            <Text style={styles.emptyStateTitle}>No workout history yet</Text>
            <Text style={styles.emptyStateText}>
              Complete your first workout to start tracking your progress!
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContent,
            {
              paddingTop: insets.top + 20,
            },
          ]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Header inside ScrollView */}
          <Animated.View
            style={[styles.scrollHeader, { opacity: headerOpacity }]}
          >
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              hitSlop={8}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={20} color="#65417C" />
            </Pressable>
            <Heading style={styles.headerTitle}>Workout History</Heading>
            <View style={styles.headerSpacer} />
          </Animated.View>

          {/* Workout History Content */}
          <View style={styles.historyContent}>
            {groupedData.map((item) => {
              const displayDate = new Date(item.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              );

              return (
                <View key={item.date} style={styles.historyGroup}>
                  <View style={styles.dateHeader}>
                    <Text style={styles.dateHeaderText}>{displayDate}</Text>
                    <Text style={styles.workoutCount}>
                      {item.workouts.length} workout
                      {item.workouts.length !== 1 ? "s" : ""}
                    </Text>
                  </View>
                  {item.workouts.map((completion, index) => (
                    <WorkoutHistoryItem
                      key={`${item.date}-${index}`}
                      completion={completion}
                    />
                  ))}
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F1",
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F2F2F1",
    zIndex: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 12,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B2E46",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 28, // Same as back button width for centering
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  scrollHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#F2F2F1",
  },
  historyContent: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2D2D",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#A184AB",
    textAlign: "center",
  },
  historyGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dateHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D2D2D",
  },
  workoutCount: {
    fontSize: 14,
    color: "#A184AB",
  },
  historyItem: {
    padding: 16,
    marginBottom: 8,
  },
  historyItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  historyItemTitleSection: {
    flex: 1,
    marginRight: 12,
  },
  historyItemTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  historyItemMeta: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#A184AB",
  },
  historyItemStats: {
    alignItems: "flex-end",
  },
  historyItemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
  badge: {
    backgroundColor: "#65417C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadge: {
    backgroundColor: "#E8E6FF",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  planBadgeText: {
    color: "#65417C",
  },
  exerciseCount: {
    fontSize: 12,
    color: "#A184AB",
    textAlign: "right",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2D2D2D",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#A184AB",
    textAlign: "center",
    lineHeight: 22,
  },
});
