import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/pro-light-svg-icons";

interface WorkoutCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  exercises: number;
  onPress?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  difficulty,
  duration,
  exercises,
  onPress,
}) => {
  const getDifficultyDots = (level: string) => {
    const totalDots = 3;
    let activeDots = 0;

    switch (level) {
      case "Easy":
        activeDots = 1;
        break;
      case "Medium":
        activeDots = 2;
        break;
      case "Hard":
        activeDots = 3;
        break;
    }

    return Array.from({ length: totalDots }, (_, index) => (
      <View
        key={index}
        style={[
          styles.difficultyDot,
          index < activeDots ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.difficultyContainer}>
            <View style={styles.difficultyDots}>
              {getDifficultyDots(difficulty)}
            </View>
            <Text style={styles.difficultyText}>{difficulty} difficulty</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesomeIcon icon={faPlus} size={16} color="#614178" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.details}>
          {duration} • {exercises} exercises
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/strength-workout.png")}
          style={styles.workoutImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5D982",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 140,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  difficultyDots: {
    flexDirection: "row",
    gap: 2,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: "#614178",
  },
  inactiveDot: {
    backgroundColor: "#D1D1D1",
  },
  difficultyText: {
    fontSize: 12,
    color: "#614178",
    fontWeight: "500",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#614178",
    marginBottom: 8,
    lineHeight: 28,
  },
  details: {
    fontSize: 14,
    color: "#614178",
    fontWeight: "500",
  },
  imageContainer: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  workoutImage: {
    width: 70,
    height: 70,
  },
});

export default WorkoutCard;
