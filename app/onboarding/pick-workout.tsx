import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import { useSettings } from "@/data/settings";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PickWorkoutScreen() {
  const [selectedWorkout, setSelectedWorkout] = useState("strength");

  const handleNext = () => {
    // Navigation logic will go here
    // router.push("/onboarding/next-screen");
  };

  return (
    <View style={styles.background}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/logo-full.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.topSection}>
            <View style={styles.textSection}>
              <Text style={styles.welcomeTitle}>
                Which workout plan would you like to join?
              </Text>
              <Text style={styles.description}>
                We'll suggest workouts based on your period. Pick one, or browse the others available.
              </Text>
            </View>

            <View style={styles.workoutOptionsSection}>
              <TouchableOpacity
                style={[
                  styles.workoutCard,
                  selectedWorkout === "running" && styles.workoutCardSelected,
                ]}
                onPress={() => setSelectedWorkout("running")}
              >
                <View style={styles.workoutImageContainer}>
                  <Image
                    source={require("../../assets/running-workout.png")}
                    style={styles.workoutImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[
                  styles.workoutTitle,
                  selectedWorkout === "running" && styles.workoutTitleSelected
                ]}>
                  Running
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.workoutCard,
                  selectedWorkout === "strength" && styles.workoutCardSelected,
                ]}
                onPress={() => setSelectedWorkout("strength")}
              >
                <View style={styles.workoutImageContainer}>
                  <Image
                    source={require("../../assets/strength-workout.png")}
                    style={styles.workoutImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[
                  styles.workoutTitle,
                  selectedWorkout === "strength" && styles.workoutTitleSelected
                ]}>
                  Strength
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F2F2F1",
  },
  container: {
    // paddingHorizontal: 16,
    justifyContent: "space-between",
    display: "flex",
    height: "100%",
  },
  safeArea: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textSection: {
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 30,
  },
  welcomeTitle: {
    fontSize: 30,
    textAlign: "center",
    color: "#2B2E46",
    marginBottom: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#9294AC",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    color: "#2B2E46",
    backgroundColor: "#FFFFFF",
  },
  textInputFocused: {
    borderColor: "#6B46C1",
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
});
