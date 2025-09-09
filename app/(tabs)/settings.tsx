import { useLogging } from "@/data/logging";
import Button from "@/components/Button";
import React from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const logging = useLogging();

  const handleClearWorkoutHistory = () => {
    Alert.alert(
      "Clear Workout History",
      "Are you sure you want to clear all workout history? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            logging.clearWorkoutHistory();
            Alert.alert("Success", "Workout history has been cleared.");
          },
        },
      ]
    );
  };

  const handleClearPeriodLogs = () => {
    Alert.alert(
      "Clear Period Logs",
      "Are you sure you want to clear all period data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            logging.clearPeriodLogs();
            Alert.alert("Success", "Period logs have been cleared.");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Data</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Clear Workout History"
              onPress={handleClearWorkoutHistory}
              variant="secondary"
            />
          </View>
          <Text style={styles.description}>
            This will remove all completed workout records while keeping your
            period and mood data.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Period Data</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Clear Period Logs"
              onPress={handleClearPeriodLogs}
              variant="secondary"
            />
          </View>
          <Text style={styles.description}>
            This will remove all period flow and symptom data while keeping your
            workout and mood data.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F1",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#614178",
    marginBottom: 32,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#614178",
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#9294AC",
    textAlign: "center",
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#9294AC",
    textAlign: "center",
  },
});
