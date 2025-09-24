import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt, faPlus, faCheck } from "@fortawesome/pro-solid-svg-icons";
import { faPartyHorn } from "@fortawesome/pro-regular-svg-icons";

interface WorkoutCardProps {
  title: string;
  difficulty: "Low" | "Medium" | "High";
  duration: string;
  exercises: number;
  onPress?: () => void;
  complete?: boolean;
  image?: ImageSourcePropType;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  difficulty,
  duration,
  exercises,
  onPress,
  complete = false,
  image,
}) => {
  const getDifficultyDots = (level: string) => {
    const totalDots = 3;
    let activeDots = 0;

    switch (level) {
      case "Low":
        activeDots = 1;
        break;
      case "Medium":
        activeDots = 2;
        break;
      case "High":
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
      >
        <FontAwesomeIcon icon={faBolt} size={7} color="#F8E4C1" />
      </View>
    ));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.difficultyContainer}>
            <View style={styles.difficultyDots}>
              {getDifficultyDots(difficulty)}
            </View>
            <Text style={styles.difficultyText}>{difficulty} difficulty</Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, complete && styles.completeButton]}
          >
            {complete ? (
              <FontAwesomeIcon icon={faCheck} size={16} color="#DEC291" />
            ) : (
              <FontAwesomeIcon icon={faPlus} size={16} color="white" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>

          {complete ? (
            <View style={styles.completedBadge}>
              <FontAwesomeIcon icon={faPartyHorn} size={13} color="#C4AA7D" />
              <Text style={styles.completedText}>Workout completed</Text>
            </View>
          ) : (
            <Text style={styles.details}>
              {duration} • {exercises} exercises
            </Text>
          )}
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={
            image || require("../assets/images/movements/moving-workout.png")
          }
          style={styles.workoutImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.backgroundBlob} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8E2BD",
    borderRadius: 28,
    paddingHorizontal: 17,
    paddingVertical: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 140,
    borderWidth: 1,
    borderColor: "#E1C593",
    overflow: "hidden",
    boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.05)",
  },
  content: {
    width: "100%",
    gap: 10,
  },
  textContent: {
    width: "55%",
    gap: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    display: "flex",
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8E4C1",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 20,
  },
  difficultyDots: {
    flexDirection: "row",
    gap: 4,
  },
  difficultyDot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  activeDot: {
    backgroundColor: "#65417C",
  },
  inactiveDot: {
    backgroundColor: "#C5A6A6",
  },
  difficultyText: {
    fontSize: 12,
    color: "#614178",
    fontWeight: "500",
  },
  addButton: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: "#EBCA90",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#5F2E71",
    marginBottom: 8,
    lineHeight: 34,
  },
  details: {
    fontSize: 14,
    color: "#5F2E71",
    fontWeight: "400",
  },
  imageContainer: {
    right: 20,
    position: "absolute",
    width: 100,
    height: 140,
    bottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  workoutImage: {
    height: 160,
    top: 10,
    right: 15,
  },
  backgroundBlob: {
    position: "absolute",
    top: "-20%",
    left: "-100%",
    right: 60,
    bottom: "-20%",
    backgroundColor: "#F5D6A0",
    borderRadius: 100,
    zIndex: -1,
    opacity: 0.8,
  },
  completeButton: {
    backgroundColor: "white",
  },
  completedBadge: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 5,
  },
  completedText: {
    fontSize: 14,
    color: "#C4AA7D",
    fontWeight: "600",
  },
});

export default WorkoutCard;
