import React, { useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { useSettings } from "@/data/settings";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Journey() {
  // const { state } = useSettings();

  const handleNext = () => {
    // Navigation logic will go here
    // router.push("/onboarding/onboardingMendbot");
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
            {/* Goal cards preview image */}
            <View style={styles.centerImageContainer}>
              <Image
                source={require("../../assets/images/twisted-card.png")}
                style={styles.centerImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textSection}>
              <Text style={styles.welcomeTitle}>Log your journey</Text>
              <Text style={styles.description}>
                Log your period, mood, nutrition and workouts.
              </Text>
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
  },
  centerImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: "100%",
    zIndex: -1,
  },
  centerImage: {
    width: "100%",
    height: 300, // Adjust height as needed
  },
  textSection: {
    alignItems: "center",
    paddingHorizontal: 20,
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
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
});
