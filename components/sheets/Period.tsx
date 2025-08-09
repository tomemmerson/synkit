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
import { Flow, useLogging } from "@/data/logging";

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

function PeriodSheet(props: SheetProps<"mood-sheet">) {
  const [selectedPeriod, setSelectedPeriod] = useState<Flow | undefined>(
    undefined
  );

  const logging = useLogging();

  const handlePeriodSelect = (periodId: any) => {
    setSelectedPeriod(periodId);
  };

  const handleLogPeriod = () => {
    if (!props.payload?.selectedDate) {
      console.error("No date selected for mood logging.");
      return;
    }

    logging.logPeriod(props.payload.selectedDate, selectedPeriod);
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
