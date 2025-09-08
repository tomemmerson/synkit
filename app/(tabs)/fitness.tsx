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

export default function Fitness() {
  const logging = useLogging();

  console.log("Current phase:", logging.calculateCurrentPhase());

  const workouts = logging.getCurrentWorkouts(true);

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
            {workouts && workouts.length > 0 && (
              <>
                <WorkoutCard
                  title={workouts[0].name}
                  difficulty="Medium"
                  onPress={() => SheetManager.show("workout-sheet")}
                  duration={workouts[0].estimatedDuration || ""}
                  exercises={5}
                />
                <Button
                  title="Start Workout"
                  round
                  onPress={() => {
                    router.push("/workout");
                  }}
                />
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
              <View style={styles.phaseItem}>
                <FontAwesomeIcon icon={faRunning} size={17} color="#6153F5" />
                <Subheading style={styles.phaseItemText}>High</Subheading>
                <Text style={styles.phaseItemLabel}>Energy level</Text>
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

              <Button title="Change" variant="secondary" />
            </Card>
          </View>
          <View style={styles.section}>
            <Subheading>Other *luteal workouts</Subheading>
          </View>
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
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 16,
  },
  phases: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
});
