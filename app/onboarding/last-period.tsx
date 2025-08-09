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
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const logging = useLogging();

  const handleNext = () => {
    // Save the last period date and navigate
    // You might want to parse and validate the date here
    // router.push("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    display="default"
                    // textColor="#2B2E46"
                    // accentColor="#6B46C1"
                    themeVariant="light"
                    onChange={() => {}}
                  />
                  {/* <TextInput
                    style={[
                      styles.textInput,
                      isFocused && styles.textInputFocused,
                    ]}
                    placeholder="22/04/25"
                    placeholderTextColor="#9294AC"
                    value={lastPeriodDate}
                    onChangeText={setLastPeriodDate}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="numeric"
                  /> */}
                </View>
              </View>

              <View style={styles.bottomSection}>
                <Button title="Next" onPress={handleNext} />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
    display: "flex",
    alignItems: "center",
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
