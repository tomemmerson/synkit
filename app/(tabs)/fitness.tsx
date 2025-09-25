import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import WorkoutCard from "@/components/WorkoutCard";
import { SheetManager } from "react-native-actions-sheet";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { router } from "expo-router";
import { useLogging } from "@/data/logging";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRunning, faTimer } from "@fortawesome/pro-regular-svg-icons";
import { faSpinnerScale } from "@fortawesome/pro-solid-svg-icons";
import { getWorkoutImage, workoutLibrary } from "@/data/workouts";

export default function Fitness() {
  const logging = useLogging();

  const todaysRecommendedWorkout = logging.getTodaysRecommendedWorkout();

  if (!todaysRecommendedWorkout) {
    return (
      <View>
        <Text>No workouts available</Text>
      </View>
    );
  }

  const completedToday = logging.getWorkoutCompletions(new Date());

  let todaysWorkout = todaysRecommendedWorkout;
  let workoutComplete = false;

  // If any workout was completed today, show that as today's workout
  if (completedToday.length > 0) {
    const mostRecentCompletion = completedToday[completedToday.length - 1]; // Get the most recent completion
    const completedWorkoutFromLibrary =
      workoutLibrary[mostRecentCompletion.workoutId];
    if (completedWorkoutFromLibrary) {
      todaysWorkout = completedWorkoutFromLibrary;
      workoutComplete = true;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Animated Header */}
          <View style={[styles.header]}>
            <Heading>Fitness</Heading>
          </View>

          <View style={styles.section}>
            <Subheading>Todays Workout</Subheading>
            <Paragraph style={{ marginBottom: 16 }}>
              A workout picked just for you, based on your cycle phase.{" "}
            </Paragraph>
            {todaysWorkout && (
              <>
                <WorkoutCard
                  title={todaysWorkout.name}
                  difficulty={todaysWorkout.difficulty || "Medium"}
                  onPress={() => {
                    !workoutComplete &&
                      router.push({
                        pathname: "/workout",
                        params: { workoutID: todaysWorkout.id },
                      });
                  }}
                  duration={todaysWorkout.estimatedDuration || ""}
                  exercises={todaysWorkout.exercises.length}
                  complete={workoutComplete}
                  image={getWorkoutImage(todaysWorkout)}
                />
                {!workoutComplete && (
                  <Button
                    title="Start Workout"
                    round
                    onPress={() => {
                      router.push({
                        pathname: "/workout",
                        params: { workoutID: todaysWorkout.id },
                      });
                    }}
                  />
                )}
              </>
            )}
          </View>
          <View style={styles.section}>
            <Subheading>Your phase</Subheading>
            <Card style={styles.phases}>
              <View style={styles.phaseItem}>
                <FontAwesomeIcon icon={faTimer} size={17} color="#6153F5" />
                <Subheading style={styles.phaseItemText}>
                  {logging.calculateCurrentPhase()}
                </Subheading>
                <Text style={styles.phaseItemLabel}>phase</Text>
              </View>
              <View style={styles.phaseItem}>
                <FontAwesomeIcon
                  icon={faSpinnerScale}
                  size={17}
                  color="#6153F5"
                />
                <Subheading style={styles.phaseItemText}>
                  {logging.getPeriodDay()}
                </Subheading>
                <Text style={styles.phaseItemLabel}>Day</Text>
              </View>
            </Card>
          </View>
          <View style={styles.section}>
            <Subheading>Workout plan</Subheading>
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  flex: 1,
                  marginRight: 12,
                }}
              >
                <Subheading style={{ marginBottom: 0, flexWrap: "wrap" }}>
                  {logging.getCurrentPlan()?.name}
                </Subheading>
                <Paragraph>Workout plan</Paragraph>
              </View>

              <Button
                title="Change"
                variant="secondary"
                onPress={() => SheetManager.show("change-plan-sheet")}
              />
            </Card>
          </View>
          <View style={styles.section}>
            <Subheading>Workout history</Subheading>
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  flex: 1,
                  marginRight: 12,
                }}
              >
                <Subheading style={{ marginBottom: 0, flexWrap: "wrap" }}>
                  {(() => {
                    const recentHistory = logging.getWorkoutHistory(7);
                    return `${recentHistory.length} workouts`;
                  })()}
                </Subheading>
                <Paragraph>Past 7 days</Paragraph>
              </View>

              <Button
                title="View All"
                variant="secondary"
                onPress={() => router.push("/workout-history")}
              />
            </Card>
          </View>
          <View style={styles.section}>
            <Subheading>
              Other {logging.calculateCurrentPhase()} workouts
            </Subheading>
            {(() => {
              const allWorkouts = logging.getCurrentWorkouts(false); // Get all workouts including completed
              const otherWorkouts =
                allWorkouts?.filter(
                  (workout) => workout.id !== todaysWorkout.id // Use todaysWorkout instead of todaysRecommendedWorkout
                ) || [];

              if (otherWorkouts.length === 0) {
                return (
                  <Paragraph style={{ fontStyle: "italic", color: "#A184AB" }}>
                    No other workouts available for this phase.
                  </Paragraph>
                );
              }

              return otherWorkouts.map((workout) => {
                // Check if this workout was completed today
                const isCompleted = completedToday.some(
                  (completion) => completion.workoutId === workout.id
                );

                return (
                  <View key={workout.id} style={styles.otherWorkoutItem}>
                    <WorkoutCard
                      title={workout.name}
                      difficulty={workout.difficulty || "Medium"}
                      onPress={() => {
                        !isCompleted &&
                          router.push({
                            pathname: "/workout",
                            params: { workoutID: workout.id },
                          });
                      }}
                      duration={workout.estimatedDuration || ""}
                      exercises={workout.exercises.length}
                      complete={isCompleted}
                      image={getWorkoutImage(workout)}
                    />
                  </View>
                );
              });
            })()}
          </View>
          <View style={{ marginBottom: 60 }} />
        </ScrollView>
      </SafeAreaView>
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
  scrollView: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  phases: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    width: "auto",
  },
  phaseItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  phaseItemText: {
    marginTop: 10,
    marginBottom: 0,
    textTransform: "capitalize",
  },
  phaseItemLabel: {
    fontSize: 16,
    color: "#A184AB",
  },
  otherWorkoutItem: {
    marginBottom: 0,
  },
});
