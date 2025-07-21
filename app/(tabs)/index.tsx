import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CalendarWidget from "@/components/CalendarWidget";
import WorkoutCard from "@/components/WorkoutCard";
import StatusCard from "@/components/StatusCard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Calendar */}
          <CalendarWidget currentDate="Today, 20 June" username="Molly" />

          {/* Today's Workout Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Todays Workout</Text>
            <WorkoutCard
              title="Low Impact Workout"
              difficulty="Medium"
              duration="45min"
              exercises={8}
              onPress={() => {
                // Handle workout press
                console.log("Workout pressed");
              }}
            />
          </View>

          {/* How are you feeling today section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How are you feeling today?</Text>

            <View style={styles.cardsGrid}>
              <View style={styles.cardRow}>
                <View style={styles.halfCard}>
                  <StatusCard
                    type="period"
                    title="Light"
                    subtitle="Day 1"
                    status="completed"
                    color="#E29B9B"
                    onPress={() => console.log("Period log pressed")}
                  />
                </View>
                <View style={styles.halfCard}>
                  <StatusCard
                    type="mood"
                    title="Happy"
                    subtitle="-"
                    status="add"
                    color="#A28BD1"
                    onPress={() => console.log("Mood pressed")}
                  />
                </View>
              </View>

              <View style={styles.fullCard}>
                <StatusCard
                  type="workout"
                  title="Logged"
                  subtitle="Moderate"
                  status="add"
                  color="#F5D982"
                  onPress={() => console.log("Workout log pressed")}
                />
              </View>
            </View>
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
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#614178",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  cardsGrid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
  fullCard: {
    width: "100%",
  },
});
