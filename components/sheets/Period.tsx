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
  faDroplet,
  faSadTear,
  faSmile,
} from "@fortawesome/pro-solid-svg-icons";
import { Flow, Symptoms, useLogging } from "@/data/logging";

interface Options extends SelectionOption {
  id: Flow;
}

const periodOptions: Options[] = [
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
    "light";

  const defaultSymptoms =
    logging.dayLog(props.payload?.selectedDate || new Date())?.period
      ?.symptoms || [];

  console.log("defaultSymptoms", defaultSymptoms);

  const [selectedPeriod, setSelectedPeriod] = useState<Flow | undefined>(
    defaultFlow
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptoms[] | []>(
    defaultSymptoms
  );

  const handlePeriodSelect = (periodId: any) => {
    setSelectedPeriod(periodId);
  };

  const handleSymptomSelect = (symptomId: Symptoms) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms((prev) =>
        prev.filter((symptom) => symptom !== symptomId)
      );
    } else {
      setSelectedSymptoms((prev) => [...prev, symptomId]);
    }
  };

  const handleLogPeriod = () => {
    if (!props.payload?.selectedDate) {
      console.error("No date selected for mood logging.");
      return;
    }

    if (!selectedPeriod) {
      console.error("No period flow selected.");
      return;
    }

    logging.logPeriod(
      props.payload.selectedDate,
      selectedPeriod,
      selectedSymptoms
    );
    SheetManager.hide("period-sheet");
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
