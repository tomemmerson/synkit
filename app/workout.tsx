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
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { faDumbbell, faCheck } from "@fortawesome/pro-solid-svg-icons";
import Button from "@/components/Button";
import { useLogging } from "@/data/logging";
import {
  workoutLibrary,
  runPlans,
  strengthPlans,
  type Workout,
  type Exercise,
  WorkoutID,
  plans,
} from "@/data/workouts";

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState("mobility");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set()
  );
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const logging = useLogging();

  const { workoutID } = useLocalSearchParams<{
    workoutID: WorkoutID;
  }>();

  console.log("workoutId", workoutID);

  // Get workout data based on parameters
  const getWorkoutData = (): {
    workout: Workout | null;
    mobility: Workout | null;
    stretch: Workout | null;
  } => {
    let selectedWorkout: Workout | null = null;

    if (workoutID) {
      // Direct workout from library
      selectedWorkout = workoutLibrary[workoutID];
    } else {
      throw new Error("No workout ID provided");
    }

    const plan = logging.currentWorkoutPlan;
    if (!plan) {
      throw new Error("No workout plan set");
    }

    const level = logging.currentWorkoutLevel;
    if (!level) {
      throw new Error("No workout level set");
    }

    return {
      workout: selectedWorkout,
      mobility: plans[plan][level].mobility,
      stretch: plans[plan][level].stretch,
    };
  };

  const { workout, mobility, stretch } = getWorkoutData();

  // Create sections array with workout data
  const workoutSections: Array<{
    id: string;
    workout: Workout;
    name: string;
    description: string;
  }> = [
    ...(mobility
      ? [
          {
            id: "mobility",
            workout: mobility,
            name: "Mobility",
            description: "Get moving with some pre-workout exercises!",
          },
        ]
      : []),
    ...(workout
      ? [
          {
            id: "workout",
            workout: workout,
            name: "Workout",
            description: `${
              workout.estimatedDuration ? `${workout.estimatedDuration} • ` : ""
            }${workout.difficulty || "Medium"} intensity workout`,
          },
        ]
      : []),
    ...(stretch
      ? [
          {
            id: "stretch",
            workout: stretch,
            name: "Stretch",
            description: "Cool down with relaxing stretches!",
          },
        ]
      : []),
  ];

  const activeSection = workoutSections.find(
    (section) => section.id === activeTab
  );

  const toggleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }

      // Check if this completion makes the section complete
      if (!newSet.has(exerciseId)) {
        // Exercise was unchecked, no need to check for completion
        return newSet;
      }

      // Exercise was just checked - see if section is now complete
      if (activeSection) {
        const sectionExerciseIds = activeSection.workout.exercises.map(
          (_, index) => `${activeSection.id}-${index}`
        );
        const allCompleted = sectionExerciseIds.every((id) => newSet.has(id));

        if (allCompleted && sectionExerciseIds.length > 0) {
          // Find next section
          const currentIndex = workoutSections.findIndex(
            (section) => section.id === activeTab
          );
          const nextSection = workoutSections[currentIndex + 1];

          if (nextSection) {
            // Auto-advance to next section after a short delay
            setTimeout(() => {
              setActiveTab(nextSection.id);
            }, 200);
          }
        }
      }

      return newSet;
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.push("/(tabs)/fitness");
  };

  const handleNext = () => {
    const currentIndex = workoutSections.findIndex(
      (section) => section.id === activeTab
    );
    const nextSection = workoutSections[currentIndex + 1];

    if (nextSection) {
      // Move to next section
      setActiveTab(nextSection.id);
    } else {
      // All sections complete - log workout completion
      if (workout) {
        const totalExercises = workoutSections.reduce(
          (total, section) => total + section.workout.exercises.length,
          0
        );
        const completedCount = completedExercises.size;

        logging.logWorkoutCompletion(
          new Date(),
          workout.id,
          workout.name,
          completedCount,
          totalExercises
        );
      }

      console.log("Workout complete!");
      router.push("/(tabs)/fitness");
    }
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

  const renderExerciseItem = (exercise: Exercise, index: number) => {
    const exerciseId = `${activeSection?.id}-${index}`;
    const isCompleted = completedExercises.has(exerciseId);

    return (
      <TouchableOpacity
        key={exerciseId}
        style={[
          styles.exerciseItem,
          isCompleted && styles.exerciseItemCompleted,
        ]}
        onPress={() => toggleExerciseComplete(exerciseId)}
        activeOpacity={0.7}
      >
        <View style={styles.exerciseNumber}>
          <Text
            style={[
              styles.exerciseNumberText,
              isCompleted && styles.exerciseNumberCompleted,
            ]}
          >
            {index + 1}.
          </Text>
        </View>

        <View style={styles.exerciseIcon}>
          <FontAwesomeIcon icon={faDumbbell} size={24} color="#A184AB" />
        </View>

        <View style={styles.exerciseContent}>
          <Text
            style={[
              styles.exerciseName,
              isCompleted && styles.exerciseNameCompleted,
            ]}
          >
            {exercise.name}
          </Text>
          <Text
            style={[
              styles.exerciseReps,
              isCompleted && styles.exerciseRepsCompleted,
            ]}
          >
            {exercise.description}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
          onPress={() => toggleExerciseComplete(exerciseId)}
        >
          {isCompleted && (
            <FontAwesomeIcon icon={faCheck} size={16} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
                  outputRange: [0, -16],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={{
            backgroundColor: "#614178",
          }}
        >
          <Animated.View
            style={[styles.titleSection, { paddingBottom: titlePadding }]}
          >
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <FontAwesomeIcon icon={faChevronLeft} size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Animated.Text
                style={[
                  styles.workoutTitle,
                  {
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [0, SCROLL_DISTANCE],
                          outputRange: [0, 8],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                {workout?.name}
              </Animated.Text>
              <Animated.Text
                style={[styles.workoutDuration, { opacity: durationOpacity }]}
              >
                {workout?.estimatedDuration}
              </Animated.Text>
            </View>

            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {workoutSections.map((section) => (
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
          {activeSection?.workout.exercises.map((exercise, index) =>
            renderExerciseItem(exercise, index)
          )}
        </View>
      </Animated.ScrollView>

      {/* Bottom Button */}
      {workoutSections.findIndex((section) => section.id === activeTab) ===
        workoutSections.length - 1 && (
        <View
          style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}
        >
          <Button title={"Complete Workout"} onPress={handleNext} />
        </View>
      )}
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
    backgroundColor: "#614178",
    boxShadow: "0px 10px 9px rgba(0, 0, 0, 0.1)",
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
    borderBottomColor: "#7B5791",
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
    color: "#FFFFFF",
    marginBottom: 2,
  },
  workoutDuration: {
    fontSize: 14,
    color: "#E6D9EA",
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
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E6D9EA",
    textAlign: "center",
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
  exerciseItemCompleted: {
    backgroundColor: "#F8F6F9",
    borderColor: "#E8E1EB",
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
  exerciseNumberCompleted: {
    color: "#8A6B92",
    textDecorationLine: "line-through",
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
  exerciseNameCompleted: {
    color: "#8A6B92",
    textDecorationLine: "line-through",
  },
  exerciseReps: {
    fontSize: 14,
    color: "#A184AB",
  },
  exerciseRepsCompleted: {
    color: "#8A6B92",
    textDecorationLine: "line-through",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D4C3D8",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  checkboxCompleted: {
    backgroundColor: "#614178",
    borderColor: "#614178",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0EDF1",
  },
});
