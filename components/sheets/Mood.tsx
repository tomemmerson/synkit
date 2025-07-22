import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/pro-light-svg-icons";
import SelectionScroll, { SelectionOption } from "@/components/SelectionScroll";

const moodOptions: SelectionOption[] = [
  { id: "happy", emoji: "😊", label: "Happy" },
  { id: "sad", emoji: "😞", label: "Sad" },
  { id: "overwhelmed", emoji: "😫", label: "Overwhelmed" },
  { id: "angry", emoji: "😠", label: "Angry" },
];

function MoodSheet() {
  const [selectedMood, setSelectedMood] = useState<string>("sad");

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleLogMood = () => {
    // Handle mood logging logic here
    console.log("Selected mood:", selectedMood);
  };

  return (
    <ActionSheet
      snapPoints={[100]}
      gestureEnabled
      containerStyle={{
        // height: "50%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <View style={styles.container}>
        <View style={[styles.header, styles.outerMargin]}>
          <Text style={styles.title}>Mood</Text>
          <TouchableOpacity style={styles.closeButton}>
            <FontAwesomeIcon icon={faXmark} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <SelectionScroll
          options={moodOptions}
          selectedId={selectedMood}
          onSelect={handleMoodSelect}
          style={styles.moodContainer}
        />

        <TouchableOpacity
          style={[styles.logButton, styles.outerMargin]}
          onPress={handleLogMood}
        >
          <Text style={styles.logButtonText}>Log mood</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  outerMargin: {
    marginHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5F2E71",
  },
  closeButton: {
    padding: 4,
  },
  moodContainer: {
    marginBottom: 40,
  },
  logButton: {
    backgroundColor: "#614178",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  logButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MoodSheet;
