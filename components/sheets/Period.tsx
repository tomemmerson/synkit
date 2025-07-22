import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
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

const periodOptions: SelectionOption[] = [
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

function PeriodSheet() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("medium");

  const handlePeriodSelect = (periodId: string) => {
    setSelectedPeriod(periodId);
  };

  const handleLogPeriod = () => {
    // Handle period logging logic here
    console.log("Selected period:", selectedPeriod);
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
        options={periodOptions}
        selectedId={selectedPeriod}
        onSelect={handlePeriodSelect}
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
