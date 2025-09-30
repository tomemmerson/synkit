import { useLogging } from "@/data/logging";
import Button from "@/components/Button";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  Linking,
  Image,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const logging = useLogging();
  const [nameInput, setNameInput] = useState(logging.name || "");
  const [isEditingName, setIsEditingName] = useState(false);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      logging.setName(nameInput.trim());
      setIsEditingName(false);
      Alert.alert("Success", "Your name has been updated.");
    } else {
      Alert.alert("Error", "Please enter a valid name.");
    }
  };

  const handleCancelEditName = () => {
    setNameInput(logging.name || "");
    setIsEditingName(false);
  };

  const handleRemoveAllData = () => {
    Alert.alert(
      "Remove All Data",
      "Are you sure you want to remove all data? This will clear your workout history, period logs, and reset the app to its initial state. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove All",
          style: "destructive",
          onPress: () => {
            logging.resetAllData();
            Alert.alert(
              "Success",
              "All data has been removed. The app will restart.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    router.replace("/onboarding/welcome");
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL(
      "https://www.privacypolicies.com/live/5297466b-1bb6-4ca3-abd4-4d2e692af0df"
    ).catch(() => {
      Alert.alert("Error", "Could not open privacy policy link.");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/synkit-color-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Settings</Text>

        {isEditingName ? (
          <View style={styles.editingContainer}>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Enter your name"
              placeholderTextColor="#9294AC"
              maxLength={50}
              autoFocus
              onSubmitEditing={handleSaveName}
              returnKeyType="done"
            />
            <View style={styles.nameButtonRow}>
              <View style={styles.nameButtonContainer}>
                <Button
                  title="Cancel"
                  onPress={handleCancelEditName}
                  variant="secondary"
                />
              </View>
              <View style={styles.nameButtonContainer}>
                <Button title="Save" onPress={handleSaveName} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.nameBubbleContainer}>
            <Text
              style={styles.nameBubble}
              onPress={() => setIsEditingName(true)}
            >
              {logging.name || "Tap to set name"}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Data</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Remove All Data"
              onPress={handleRemoveAllData}
              variant="secondary"
            />
          </View>
          <Text style={styles.description}>
            This will remove all your data including workout history, period
            logs, and reset the app to its initial state. You'll need to
            complete onboarding again.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Privacy Policy"
              onPress={handlePrivacyPolicy}
              variant="secondary"
            />
          </View>
          <Text style={styles.description}>
            View our privacy policy and terms of service.
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 40,
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
  nameBubbleContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  nameBubble: {
    backgroundColor: "#614178",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: "center",
    overflow: "hidden",
  },
  editingContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  nameInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2B2E46",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    textAlign: "center",
  },
  nameButtonRow: {
    flexDirection: "row",
    gap: 12,
  },
  nameButtonContainer: {
    flex: 1,
  },
});
