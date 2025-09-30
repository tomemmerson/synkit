import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import { useSettings } from "@/data/settings";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogging } from "@/data/logging";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function LastPeriodScreen() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(
    undefined
  );
  const logging = useLogging();

  const handleNext = () => {
    // Save the last period date and navigate
    if (!lastPeriodDate) {
      return;
    }

    logging.setInitialPeriodDate(new Date(lastPeriodDate));
    logging.setOnboardingComplete(true);
    router.push("/(tabs)");
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
                When did your last period start?
              </Text>
              <Text style={styles.description}>
                We use period tracking to show workouts based on your cycle.
              </Text>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Period start date</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={lastPeriodDate || new Date()}
                mode={"date"}
                display="default"
                // textColor="#2B2E46"
                // accentColor="#6B46C1"
                themeVariant="light"
                onChange={(event, date) => {
                  if (date) {
                    setLastPeriodDate(date);
                  }
                }}
              />
            </View>
          </View>

          <View style={styles.bottomSection}>
            <Button
              title="Next"
              onPress={handleNext}
              disabled={!lastPeriodDate}
            />
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
    // justifyContent: "center",
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
    marginBottom: 40,
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 16,
    color: "#2B2E46",
    fontWeight: "500",
    marginBottom: 8,
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
