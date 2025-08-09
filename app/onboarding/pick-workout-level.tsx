import React, { useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { useSettings } from "@/data/settings";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { runPlans, strengthPlans, WorkoutPlanType } from "@/data/workouts";
import { useLogging } from "@/data/logging";

export default function PickStrengthLevelScreen() {
  const { workoutType } = useLocalSearchParams<{
    workoutType?: WorkoutPlanType;
  }>();
  const [selectedLevel, setSelectedLevel] = useState("intermediate");

  const logging = useLogging();

  let workoutPlans;
  switch (workoutType) {
    case "running":
      workoutPlans = runPlans;
      break;
    case "strength":
      workoutPlans = strengthPlans;
      break;
    default:
      return <Text>No workout plans available.</Text>;
  }

  const handleNext = () => {
    // Navigation logic will go here
    logging.setWorkoutPlan(workoutType);
    logging.setWorkoutLevel(selectedLevel);

    router.push("/onboarding/last-period");
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
              <Text style={styles.welcomeTitle}>What level are you?</Text>
              <Text style={styles.description}>
                We'll suggest workouts based on your training and what you're
                comfortable with.
              </Text>
            </View>

            <View style={styles.levelOptionsSection}>
              {Object.entries(workoutPlans).map(([key, plan]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.levelCard,
                    selectedLevel === key && styles.levelCardSelected,
                  ]}
                  onPress={() => setSelectedLevel(key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.levelImageContainer}>
                    <Image
                      source={plan.icon}
                      style={styles.levelImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.levelTextContainer}>
                    <Text
                      style={[
                        styles.levelTitle,
                        selectedLevel === key && styles.levelTitleSelected,
                      ]}
                    >
                      {plan.name}
                    </Text>
                    <Text style={styles.levelDescription}>
                      {plan.requirements}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
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
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#9294AC",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  levelOptionsSection: {
    gap: 16,
  },
  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  levelCardSelected: {
    borderColor: "#6B46C1",
  },
  levelImageContainer: {
    marginRight: 20,
  },
  levelImage: {
    width: 60,
    height: 60,
  },
  levelTextContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5F2E71",
    marginBottom: 2,
  },
  levelTitleSelected: {
    color: "#6B46C1",
  },
  levelSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B2E46",
    marginBottom: 4,
  },
  levelSubtitleSelected: {
    color: "#6B46C1",
  },
  levelDescription: {
    fontSize: 14,
    color: "#9294AC",
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
});
