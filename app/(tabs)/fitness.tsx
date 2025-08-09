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

export default function Fitness() {
  const logging = useLogging();

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
            <WorkoutCard
              title="Low Impact Workout"
              difficulty="Medium"
              onPress={() => SheetManager.show("workout-sheet")}
              duration="30 mins"
              exercises={5}
            />
            <Button
              title="Start Workout"
              round
              onPress={() => {
                router.push("/workout");
              }}
            />
          </View>
          <View style={styles.section}>
            <Subheading>Your phase</Subheading>
            <Card></Card>
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
                }}
              >
                <Subheading style={{ marginBottom: 0 }}>
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
});
