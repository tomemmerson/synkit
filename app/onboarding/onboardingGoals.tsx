import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSettings } from "@/data/settings";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function OnboardingGoalsScreen() {
  const { state } = useSettings();

  const handleNext = () => {
    // Navigation logic will go here
    router.push("/onboarding/onboardingMendbot");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/onboard-background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <StatusBar style="dark" />

          <View style={styles.topSection}>
            {/* Header with logo */}
            <View style={styles.header}>
              <Image
                source={require("../../assets/images/mend-logo-blue.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Goal cards preview image */}
            <View style={styles.centerImageContainer}>
              <Image
                source={require("../../assets/images/mend-onboard-image.png")}
                style={styles.centerImage}
                resizeMode="contain"
              />
            </View>

            {/* Welcome text section */}
            <View style={styles.textSection}>
              <Typography style={styles.welcomeTitle} weight="semiBold">
                Welcome to Mend,
              </Typography>
              <Typography style={styles.description} weight="regular">
                Mend is a Habit and mental health toolkit, designed to track
                your mood and keep you aligned on your goals.
              </Typography>
            </View>
          </View>

          {/* Bottom button */}
          <View style={styles.bottomSection}>
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    display: "flex",
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    height: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingTop: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 40,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    minHeight: "75%",
  },
  centerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  centerImage: {
    // width: "90%",
    height: 350,
    maxWidth: 300,
  },
  textSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    textAlign: "center",
    color: "#2A2E47",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#9294AC",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
});
