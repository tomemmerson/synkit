import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
  faDroplet,
  faDropletSlash,
  faSadTear,
  faSmile,
} from "@fortawesome/pro-solid-svg-icons";
import { Flow, Symptoms, useLogging } from "@/data/logging";

interface Options extends SelectionOption {
  id: Flow;
}

const periodOptions: Options[] = [
  {
    id: "none",
    icon: {
      icon: faDropletSlash,
      color: "#5F2E71",
      size: 30,
    },
    label: "None",
  },
  {
    id: "light",
    icon: {
      icon: faDroplet,
      color: "#E29A96",
      size: 20,
    },
    label: "Light",
  },
  {
    id: "medium",
    icon: {
      icon: faDroplet,
      color: "#E29A96",
      size: 25,
    },
    label: "Medium",
  },
  {
    id: "heavy",
    icon: {
      icon: faDroplet,
      color: "#E29A96",
      size: 34,
    },
    label: "Heavy",
  },
  {
    id: "very-heavy",
    icon: {
      icon: faDroplet,
      color: "#E29A96",
      size: 40,
    },
    label: "Very heavy",
  },
];

interface SymptomOptions extends SelectionOption {
  id: Symptoms;
}

const symptomOptions: SymptomOptions[] = [
  {
    id: "cramps",
    image: {
      image: require("@/assets/images/icons/cramps.png"),
    },
    label: "Cramps",
  },
  {
    id: "bloating",
    image: {
      image: require("@/assets/images/icons/bloating.png"),
    },
    label: "Bloating",
  },
  {
    id: "mood-swings",
    image: {
      image: require("@/assets/images/icons/mood-swings.png"),
    },
    label: "Mood Swings",
  },
  {
    id: "headaches",
    image: {
      image: require("@/assets/images/icons/headache.png"),
    },
    label: "Headache",
  },
  {
    id: "fatigue",
    image: {
      image: require("@/assets/images/icons/fatigue.png"),
    },
    label: "Fatigue",
  },
];

function PeriodSheet(props: SheetProps<"mood-sheet">) {
  const logging = useLogging();

  const defaultFlow =
    logging.dayLog(props.payload?.selectedDate || new Date())?.period?.flow ||
    "none";

  const defaultSymptoms =
    logging.dayLog(props.payload?.selectedDate || new Date())?.period
      ?.symptoms || [];

  console.log("defaultSymptoms", defaultSymptoms);

  const [selectedPeriod, setSelectedPeriod] = useState<Flow | undefined>(
    defaultFlow
  );
  const [selectedSymptoms, setSelectedSymptoms] =
    useState<Symptoms[]>(defaultSymptoms);

  const handlePeriodSelect = (periodId: any) => {
    setSelectedPeriod(periodId);
  };

  const handleSymptomSelect = (symptomId: string) => {
    const typedSymptomId = symptomId as Symptoms;
    if (selectedSymptoms.includes(typedSymptomId)) {
      setSelectedSymptoms((prev) =>
        prev.filter((symptom) => symptom !== typedSymptomId)
      );
    } else {
      setSelectedSymptoms((prev) => [...prev, typedSymptomId]);
    }
  };

  const handleLogPeriod = async () => {
    if (!props.payload?.selectedDate) {
      console.error("No date selected for mood logging.");
      return;
    }

    if (!selectedPeriod) {
      console.error("No period flow selected.");
      return;
    }

    // Get previous phase before logging the new period
    const previousPhase = logging.calculateCurrentPhase(
      props.payload.selectedDate
    );

    // Log the period first
    logging.logPeriod(
      props.payload.selectedDate,
      selectedPeriod,
      selectedSymptoms
    );

    // Get new phase after logging
    const newPhase = logging.calculateCurrentPhase(props.payload.selectedDate);

    // Check if we should prompt for level progression
    const shouldPromptLevelUp = await logging.checkForNewCycleAndPromptLevelUp(
      props.payload.selectedDate,
      selectedPeriod,
      previousPhase,
      newPhase
    );

    if (shouldPromptLevelUp) {
      const currentPlan = logging.currentWorkoutPlan;
      const currentLevel = logging.currentWorkoutLevel;
      const nextLevel = logging.getNextWorkoutLevel(
        currentPlan!,
        currentLevel!
      );

      if (nextLevel) {
        const currentPlan = logging.getCurrentPlan();
        const currentLevelName = currentPlan?.name || "Current Level";
        const nextLevelName = logging.getWorkoutLevelName(
          logging.currentWorkoutPlan!,
          nextLevel
        );

        Alert.alert(
          "New Cycle Started!",
          `You've completed your ${currentLevelName} plan. Would you like to progress to the next level or continue your current level?`,
          [
            {
              text: "Continue current plan",
              style: "cancel",
              onPress: () => {
                SheetManager.hide("period-sheet");
              },
            },
            {
              text: "Move to Next Level",
              onPress: () => {
                logging.setWorkoutLevel(nextLevel);
                Alert.alert(
                  "Level Up!",
                  `Congratulations! You've been moved to ${nextLevelName}. Your new workouts will be available based on your current cycle phase.`,
                  [
                    {
                      text: "OK",
                      onPress: () => SheetManager.hide("period-sheet"),
                    },
                  ]
                );
              },
            },
          ]
        );
      } else {
        SheetManager.hide("period-sheet");
      }
    } else {
      SheetManager.hide("period-sheet");
    }
  };

  return (
    <BaseSheet
      title="Period"
      buttonName="Log Period"
      onSelect={handleLogPeriod}
    >
      <SelectionScroll
        title="Flow"
        options={periodOptions}
        selectedId={selectedPeriod}
        onSelect={handlePeriodSelect}
      />
      <SelectionScroll
        title="Symptoms"
        options={symptomOptions}
        selectedIds={selectedSymptoms}
        multiSelect
        onSelect={handleSymptomSelect}
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

export default PeriodSheet;
