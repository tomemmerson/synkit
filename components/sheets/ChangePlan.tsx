import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import BaseSheet from "./BaseSheet";
import { useLogging } from "@/data/logging";
import { WorkoutPlanType, strengthPlans, runPlans } from "@/data/workouts";

function ChangePlanSheet(props: SheetProps<"change-plan-sheet">) {
  const logging = useLogging();

  const [selectedTab, setSelectedTab] = useState<WorkoutPlanType>(
    logging.currentWorkoutPlan || "strength"
  );

  // Track selections for each tab separately
  const [strengthSelection, setStrengthSelection] = useState<string | null>(
    logging.currentWorkoutPlan === "strength"
      ? logging.currentWorkoutLevel || null
      : null
  );
  const [runningSelection, setRunningSelection] = useState<string | null>(
    logging.currentWorkoutPlan === "running"
      ? logging.currentWorkoutLevel || null
      : null
  );

  // Get current selection based on active tab
  const selectedLevel =
    selectedTab === "strength" ? strengthSelection : runningSelection;

  const handleSave = () => {
    if (selectedLevel) {
      logging.setWorkoutPlan(selectedTab);
      logging.setWorkoutLevel(selectedLevel);
      SheetManager.hide("change-plan-sheet");
    }
  };

  const currentPlans = selectedTab === "strength" ? strengthPlans : runPlans;

  return (
    <BaseSheet
      title="Change workout plan"
      buttonName="Save"
      onSelect={handleSave}
    >
      <View style={styles.container}>
        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "strength" && styles.activeTab]}
            onPress={() => {
              setSelectedTab("strength");
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "strength" && styles.activeTabText,
              ]}
            >
              Strength
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "running" && styles.activeTab]}
            onPress={() => {
              setSelectedTab("running");
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "running" && styles.activeTabText,
              ]}
            >
              Running
            </Text>
          </TouchableOpacity>
        </View>

        {/* Level Selection */}
        <View style={styles.levelOptionsSection}>
          {Object.entries(currentPlans).map(([key, plan]) => (
            <TouchableOpacity
              key={plan.name}
              style={[
                styles.levelCard,
                selectedLevel === key && styles.levelCardSelected,
              ]}
              onPress={() => {
                if (selectedTab === "strength") {
                  setStrengthSelection(key);
                } else {
                  setRunningSelection(key);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={styles.levelImageContainer}>
                <Image
                  source={plan.icon}
                  style={styles.levelImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.levelTextContainer}>
                <Text
                  style={[
                    styles.levelTitle,
                    selectedLevel === key && styles.levelTitleSelected,
                  ]}
                >
                  {plan.name}
                </Text>
                <Text style={styles.levelDescription}>{plan.requirements}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BaseSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F2F1",
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9294AC",
  },
  activeTabText: {
    color: "#5F2E71",
  },
  levelOptionsSection: {
    gap: 16,
  },
  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E1",
  },
  levelCardSelected: {
    borderColor: "#6B46C1",
    backgroundColor: "#F8F6FF",
  },
  levelImageContainer: {
    marginRight: 16,
  },
  levelImage: {
    width: 50,
    height: 50,
  },
  levelTextContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5F2E71",
    marginBottom: 4,
  },
  levelTitleSelected: {
    color: "#6B46C1",
  },
  levelDescription: {
    fontSize: 14,
    color: "#9294AC",
    lineHeight: 20,
  },
});

export default ChangePlanSheet;
