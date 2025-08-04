import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { faDumbbell } from "@fortawesome/pro-solid-svg-icons";
import Button from "@/components/Button";

interface Exercise {
  id: string;
  name: string;
  reps: string;
  icon: string;
}

interface WorkoutSection {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

const workoutData: WorkoutSection[] = [
  {
    id: "mobility",
    name: "Mobility",
    description: "Get moving with some pre-workout exercises!",
    exercises: [
      {
        id: "1",
        name: "Hamstring stretch",
        reps: "10 reps each side",
        icon: "dumbbell",
      },
      {
        id: "2",
        name: "Hip rotations",
        reps: "10 reps each side",
        icon: "dumbbell",
      },
      {
        id: "2",
        name: "Hip rotations",
        reps: "10 reps each side",
        icon: "dumbbell",
      },
      {
        id: "2",
        name: "Hip rotations",
        reps: "10 reps each side",
        icon: "dumbbell",
      },
      {
        id: "2",
        name: "Hip rotations",
        reps: "10 reps each side",
        icon: "dumbbell",
      },
    ],
  },
  {
    id: "workout",
    name: "Workout",
    description: "Main workout routine to build strength and endurance!",
    exercises: [
      {
        id: "3",
        name: "Push-ups",
        reps: "15 reps",
        icon: "dumbbell",
      },
      {
        id: "4",
        name: "Squats",
        reps: "20 reps",
        icon: "dumbbell",
      },
      {
        id: "5",
        name: "Plank",
        reps: "30 seconds",
        icon: "dumbbell",
      },
    ],
  },
  {
    id: "stretch",
    name: "Stretch",
    description: "Cool down with relaxing stretches!",
    exercises: [
      {
        id: "6",
        name: "Forward fold",
        reps: "Hold 30 seconds",
        icon: "dumbbell",
      },
      {
        id: "7",
        name: "Child's pose",
        reps: "Hold 30 seconds",
        icon: "dumbbell",
      },
    ],
  },
];

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState("mobility");
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = useState(false);

  const activeSection = workoutData.find((section) => section.id === activeTab);

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.push("/(tabs)/fitness");
  };

  const handleNext = () => {
    // Handle next action - could navigate to next tab or start workout
    console.log("Next pressed");
  };

  // Animation values for scroll
  const SCROLL_DISTANCE = 50;

  const durationOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const titlePadding = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [20, 8],
    extrapolate: "clamp",
  });

  const renderExerciseItem = (exercise: Exercise, index: number) => (
    <View key={exercise.id} style={styles.exerciseItem}>
      <View style={styles.exerciseNumber}>
        <Text style={styles.exerciseNumberText}>{index + 1}.</Text>
      </View>
      <View style={styles.exerciseIcon}>
        <FontAwesomeIcon icon={faDumbbell} size={24} color="#A184AB" />
      </View>
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseReps}>{exercise.reps}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Absolutely positioned header */}
      <Animated.View
        style={[
          styles.absoluteHeader,
          {
            paddingTop: insets.top,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, SCROLL_DISTANCE],
                  outputRange: [0, -20],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#EEEBF1",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Animated.View
            style={[styles.titleSection, { paddingBottom: titlePadding }]}
          >
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <FontAwesomeIcon icon={faChevronLeft} size={20} color="#614178" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.workoutTitle}>Full body workout</Text>
              <Animated.Text
                style={[styles.workoutDuration, { opacity: durationOpacity }]}
              >
                45mins
              </Animated.Text>
            </View>

            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} size={20} color="#614178" />
            </TouchableOpacity>
          </Animated.View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {workoutData.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.tab,
                  activeTab === section.id && styles.activeTab,
                ]}
                onPress={() => setActiveTab(section.id)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === section.id && styles.activeTabText,
                  ]}
                >
                  {section.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.ScrollView
        style={[styles.content, { paddingTop: 180 + insets.top }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        bounces={true}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{activeSection?.name}</Text>
          <Text style={styles.sectionDescription}>
            {activeSection?.description}
          </Text>
        </View>

        <View style={styles.exercisesList}>
          {activeSection?.exercises.map((exercise, index) =>
            renderExerciseItem(exercise, index)
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F7",
  },
  absoluteHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    backgroundColor: "#FFFFFF",
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEBF1",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#614178",
    marginBottom: 2,
  },
  workoutDuration: {
    fontSize: 14,
    color: "#A184AB",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#EFECF0",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A184AB",
  },
  activeTabText: {
    color: "#614178",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#614178",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#A184AB",
    lineHeight: 24,
  },
  exercisesList: {
    gap: 16,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0EDF1",
  },
  exerciseNumber: {
    marginRight: 16,
    minWidth: 20,
  },
  exerciseNumberText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A184AB",
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#F5F3F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#614178",
    marginBottom: 4,
  },
  exerciseReps: {
    fontSize: 14,
    color: "#A184AB",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0EDF1",
  },
});
