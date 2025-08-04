import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import SelectionScroll, { SelectionOption } from "@/components/SelectionScroll";
import BaseSheet from "./BaseSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngry,
  faDizzy,
  faSadTear,
  faSmile,
} from "@fortawesome/pro-solid-svg-icons";
import { Mood, useLogging } from "@/data/logging";

const moodOptions: (SelectionOption & { id: Mood })[] = [
  {
    id: "happy",
    icon: {
      icon: faSmile,
      color: "#94D38D",
    },
    label: "Happy",
  },
  {
    id: "sad",
    icon: {
      icon: faSadTear,
      color: "#D3A98D",
    },
    label: "Sad",
  },
  {
    id: "overwhelmed",
    icon: {
      icon: faDizzy,
      color: "#5F2E71",
    },
    label: "Overwhelmed",
  },
  {
    id: "angry",
    icon: {
      icon: faAngry,
      color: "#5F2E71",
    },
    label: "Angry",
  },
];

type Props = {
  selectedDate: Date;
};

function MoodSheet(props: SheetProps<"mood-sheet">) {
  const { dayLog, logMood } = useLogging();

  const defaultMood =
    dayLog(props.payload?.selectedDate || new Date())?.mood || "sad";

  const [selectedMood, setSelectedMood] = useState<string>(defaultMood);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleLogMood = () => {
    // Handle mood logging logic here
    console.log("Selected mood:", selectedMood);
    console.log("Selected date:", props.payload?.selectedDate);

    if (!props.payload?.selectedDate) {
      console.error("No date selected for mood logging.");
      return;
    }

    logMood(props.payload?.selectedDate, selectedMood as Mood);

    SheetManager.hide("mood-sheet");
  };

  return (
    <BaseSheet title="Mood" buttonName="Log Mood" onSelect={handleLogMood}>
      <SelectionScroll
        options={moodOptions}
        selectedId={selectedMood}
        onSelect={handleMoodSelect}
        style={styles.moodContainer}
      />
    </BaseSheet>
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
