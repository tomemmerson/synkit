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

export default function NameScreen() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleGetStarted = () => {
    // Navigation logic will go here
    router.push("/onboarding/pick-workout");
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
                    What should we call you?
                  </Text>
                  <Text style={styles.description}>
                    What should we refer to you on the app as.
                  </Text>
                </View>

                <View style={styles.inputSection}>
                  <TextInput
                    style={[
                      styles.textInput,
                      isFocused && styles.textInputFocused,
                    ]}
                    placeholder="Joan Smith"
                    placeholderTextColor="#9294AC"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.bottomSection}>
                <Button title="Get Started" onPress={handleGetStarted} />
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
