import { ImageSourcePropType } from "react-native";

export type Exercise = {
  name: string;
  description: string;
  icon: string;
};

export type Workout = {
  day: number;
  name: string;
  estimatedDuration?: string;
  difficulty?: "Medium" | "High" | "Low";
  exercises: Exercise[];
};

type Phase = {
  workouts: Workout[];
};

export type PhaseType = "menstrual" | "follicular" | "ovulation" | "luteal";

export type WorkoutPlanType = "running" | "strength";

export type WorkoutLevel = keyof typeof runPlans | keyof typeof strengthPlans;

export type WorkoutPlan = {
  name: string;
  level: string;
  requirements: string;
  icon: ImageSourcePropType;
  phases: {
    menstrual: Phase;
    follicular: Phase;
    ovulation: Phase;
    luteal: Phase;
  };
  mobility: Workout;
  stretch: Workout;
};

type Plan = Record<string, WorkoutPlan>;

// Central workout library with memorable names
export const workoutLibrary = {
  // Walking workouts
  gentleWalk: {
    day: 1,
    name: "Walk",
    exercises: [
      {
        name: "Walk",
        description: "20-30mins",
        icon: "TODO",
      },
    ],
    difficulty: "Low" as const,
    estimatedDuration: "30 mins",
  },

  // Run/Walk workouts
  beginnerRunWalk: {
    day: 2,
    name: "Run/Walk",
    exercises: [
      {
        name: "Run/Walk Intervals",
        description: "1 min slow run/ 2 min walk - Repeat this 5 times",
        icon: "TODO",
      },
    ],
    estimatedDuration: "20 mins",
  },

  follicularRunWalk: {
    day: 1,
    name: "Run/Walk Intervals",
    exercises: [
      {
        name: "Run/Walk Intervals",
        description: "2min run/ 2 min walk - repeat 6 times",
        icon: "TODO",
      },
    ],
  },

  ovulationRunWalk: {
    day: 1,
    name: "Run/Walk",
    exercises: [
      {
        name: "Run/Walk",
        description: "2min run/ 1min walk - repeat 5 times",
        icon: "TODO",
      },
    ],
  },

  intermediateRunWalk1: {
    day: 1,
    name: "Run/Walk Intervals",
    exercises: [
      {
        name: "Run 3 min/ walk 3 mins",
        description: "Run 3 min/ walk 3 mins",
        icon: "TODO",
      },
      {
        name: "Run 5mins/ walk 5mins",
        description: "Run 5mins/ walk 5mins",
        icon: "TODO",
      },
      {
        name: "Run 5mins/ walk 5mins",
        description: "Run 5mins/ walk 5mins",
        icon: "TODO",
      },
    ],
  },

  intermediateRunWalk2: {
    day: 1,
    name: "Run/Walk",
    exercises: [
      {
        name: "Run 5 min/ walk 3 mins",
        description: "Run 5 min/ walk 3 mins",
        icon: "TODO",
      },
      {
        name: "Run 5mins/ walk 3mins",
        description: "Run 5mins/ walk 3mins",
        icon: "TODO",
      },
      {
        name: "Run 5mins/ walk 3mins",
        description: "Run 5mins/ walk 3mins",
        icon: "TODO",
      },
    ],
  },

  // Stretch workouts
  basicStretch: {
    day: 3,
    name: "Stretch or Yoga Class",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s each leg x2 sets",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s each leg x2 sets",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Shoulder stretch",
        description: "30s each arm",
        icon: "TODO",
      },
    ],
  },

  // Strength workouts
  beginnerStrength: {
    day: 2,
    name: "Strength training",
    exercises: [
      {
        name: "BW squats",
        description: "10 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "BW lunges",
        description: "10 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "Calf Raises",
        description: "10 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder taps",
        description: "12 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "30s/ 2 sets",
        icon: "TODO",
      },
      {
        name: "Bird Dog",
        description: "10 reps x 2sets",
        icon: "TODO",
      },
    ],
  },

  intermediateStrength: {
    day: 2,
    name: "Strength training",
    exercises: [
      {
        name: "DB Lunges",
        description: "10 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "DB deadlifts",
        description: "10 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder press",
        description: "10 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Renegade Rows",
        description: "6 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "Slow Mountain Climber",
        description: "10 reps / 2 sets",
        icon: "TODO",
      },
      {
        name: "Deadlift",
        description: "10 reps / 2sets",
        icon: "TODO",
      },
    ],
  },

  // Advanced workouts
  lutealRunWalk: {
    day: 1,
    name: "Run/Walk",
    exercises: [
      {
        name: "90s run/ 90s walk",
        description: "90s run/ 90s walk",
        icon: "TODO",
      },
      {
        name: "3min run/ 3min walk",
        description: "3min run/ 3min walk - repeat both 3 times",
        icon: "TODO",
      },
    ],
  },

  ovulationRunWalkAdvanced: {
    day: 3,
    name: "Run/Walk",
    exercises: [
      {
        name: "90sec run/ 90sec walk",
        description: "90sec run/ 90sec walk",
        icon: "TODO",
      },
      {
        name: "3min run/ 3min walk",
        description: "3min run/ 3min walk - repeat both 3 times",
        icon: "TODO",
      },
    ],
  },

  lutealStrength: {
    day: 2,
    name: "Strength training",
    exercises: [
      {
        name: "BW squats",
        description: "12 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "BW lunges",
        description: "12 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "Calf Raises",
        description: "12 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder taps",
        description: "16 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "45s/ 2 sets",
        icon: "TODO",
      },
      {
        name: "Bird Dog",
        description: "16 reps x 2sets",
        icon: "TODO",
      },
    ],
  },

  lutealRunWalkLong: {
    day: 3,
    name: "Run/walk",
    exercises: [
      {
        name: "Run 3 min/ walk 3 mins",
        description: "Run 3 min/ walk 3 mins",
        icon: "TODO",
      },
      {
        name: "Run 5mins/ walk 5mins",
        description: "Run 5mins/ walk 5mins",
        icon: "TODO",
      },
      {
        name: "Run 5mins/ walk 5mins",
        description: "Run 5mins/ walk 5mins",
        icon: "TODO",
      },
    ],
  },

  follicularRunWalkBasic: {
    day: 3,
    name: "Run/Walk",
    exercises: [
      {
        name: "Run/Walk",
        description: "2min run/ 2 min walk - repeat 6 times",
        icon: "TODO",
      },
    ],
  },

  intermediateRunWalkShort: {
    day: 3,
    name: "Run/Walk",
    exercises: [
      {
        name: "Run/Walk",
        description: "2min run/ 2 min walk",
        icon: "TODO",
      },
    ],
  },

  intermediateRunWalkLong: {
    day: 3,
    name: "Run/Walk",
    exercises: [
      {
        name: "Run 8 min/ walk 5 mins",
        description: "Run 8 min/ walk 5 mins",
        icon: "TODO",
      },
      {
        name: "Run 8 mins/ walk 3mins",
        description: "Run 8 mins/ walk 3mins",
        icon: "TODO",
      },
    ],
  },

  continuousRun15: {
    day: 1,
    name: "Run",
    exercises: [
      {
        name: "Run 15min",
        description: "Run 15min",
        icon: "TODO",
      },
    ],
  },

  advancedStrength: {
    day: 2,
    name: "Strength training",
    exercises: [
      {
        name: "DB Lunges",
        description: "12 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "DB deadlifts",
        description: "12 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder press",
        description: "12 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Renegade Rows",
        description: "8 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "Slow Mountain Climber",
        description: "16 reps / 2 sets",
        icon: "TODO",
      },
      {
        name: "Deadlift",
        description: "16 reps / 2sets",
        icon: "TODO",
      },
    ],
  },

  advancedRunWalk: {
    day: 3,
    name: "Run/walk",
    exercises: [
      {
        name: "Run 10 min/ walk 5mins",
        description: "Run 10 min/ walk 5mins",
        icon: "TODO",
      },
      {
        name: "Run 10mins/ walk 5mins",
        description: "Run 10mins/ walk 5mins",
        icon: "TODO",
      },
    ],
  },

  // Mobility workout
  mobilityWorkout: {
    day: 1,
    name: "Mobility",
    exercises: [
      {
        name: "Hip Rotations",
        description: "10 reps each side",
        icon: "TODO",
      },
      {
        name: "Glute Bridges",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Frog Squats",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "T-Spine Rotation",
        description: "6 reps each side x 2 sets",
        icon: "TODO",
      },
    ],
  },

  // Stretch workout
  stretchWorkout: {
    day: 1,
    name: "Stretch",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad stretch",
        description: "30s each leg",
        icon: "TODO",
      },
    ],
  },

  // Intermediate Advanced workouts
  longWalk: {
    day: 1,
    name: "Walk",
    exercises: [
      {
        name: "Walk",
        description: "45mins to 1 hour",
        icon: "TODO",
      },
    ],
    difficulty: "Low" as const,
    estimatedDuration: "45-60 mins",
  },

  walkOrJog: {
    day: 2,
    name: "Walk or Jog",
    exercises: [
      {
        name: "Walk or Jog",
        description: "20 mins",
        icon: "TODO",
      },
    ],
    estimatedDuration: "20 mins",
  },

  advancedStretchYoga: {
    day: 3,
    name: "Stretch or Yoga Class",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s each leg x2 sets",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s each leg x2 sets",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Shoulder stretch",
        description: "30s each arm",
        icon: "TODO",
      },
    ],
  },

  follicularRunWalkAdvanced: {
    day: 1,
    name: "Run/Walk Intervals",
    exercises: [
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
      {
        name: "Run/Walk Intervals",
        description: "1min run x 1min walk - Repeat 8 times",
        icon: "TODO",
      },
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  recoveryRun25: {
    day: 2,
    name: "Recovery Run",
    exercises: [
      {
        name: "Recovery Run",
        description: "25 min run",
        icon: "TODO",
      },
    ],
    estimatedDuration: "25 mins",
  },

  advancedStrengthTraining: {
    day: 3,
    name: "Strength training",
    exercises: [
      {
        name: "DB Squats",
        description: "10 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "DB deadlifts",
        description: "10 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Glute Bridges",
        description: "10 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Chest press",
        description: "10 reps / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB bent over row",
        description: "10 reps / 3 sets",
        icon: "TODO",
      },
      {
        name: "Side lunge",
        description: "30sec each side / 2sets",
        icon: "TODO",
      },
      {
        name: "Bicycle Crunch",
        description: "12 reps/ 2 sets",
        icon: "TODO",
      },
    ],
  },

  longRun30: {
    day: 4,
    name: "Long Run",
    exercises: [
      {
        name: "Long Run",
        description: "30min or 5k",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  ovulationRunWalkAdvanced2: {
    day: 1,
    name: "Run/Walk Intervals",
    exercises: [
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
      {
        name: "Run/Walk Intervals",
        description: "2min run x 1 min recovery - repeat 10 times",
        icon: "TODO",
      },
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  lutealRunWalkAdvanced: {
    day: 1,
    name: "Run/ Walk Intervals",
    exercises: [
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
      {
        name: "Run/Walk Intervals",
        description: "3min run x 1min recovery - repeat 8 times",
        icon: "TODO",
      },
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
    ],
    estimatedDuration: "42 mins",
  },

  lutealStrengthAdvanced: {
    day: 4,
    name: "Strength training",
    exercises: [
      {
        name: "DB Squats",
        description: "15 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "DB deadlifts",
        description: "15 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Glute Bridges",
        description: "15 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "Chest press",
        description: "15 reps / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB bent over row",
        description: "15 reps / 3 sets",
        icon: "TODO",
      },
      {
        name: "Side lunge",
        description: "30sec each side / 2sets",
        icon: "TODO",
      },
      {
        name: "Alternating Bicycle Crunch",
        description: "16 reps/ 2 sets",
        icon: "TODO",
      },
    ],
  },

  longRun40: {
    day: 3,
    name: "Long Run",
    exercises: [
      {
        name: "Long Run",
        description: "40mins or 6k",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  // Advanced mobility workout
  advancedMobilityWorkout: {
    day: 1,
    name: "Mobility",
    exercises: [
      {
        name: "Hip Rotations",
        description: "10reps each side",
        icon: "TODO",
      },
      {
        name: "Glute Bridges",
        description: "10 reps x 2sets",
        icon: "TODO",
      },
      {
        name: "Frog Squats",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "T-Spine Rotation",
        description: "6 reps each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "Calf Raises",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
    ],
  },

  // Advanced stretch workout
  advancedStretchWorkout: {
    day: 1,
    name: "Stretch",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Wall Calf Stretch",
        description: "30sec each leg",
        icon: "TODO",
      },
    ],
  },

  // Run Advanced workouts
  walkOrJog30: {
    day: 2,
    name: "Walk or Jog",
    exercises: [
      {
        name: "Walk or Jog",
        description: "30 mins",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  advancedFollicularRunWalk: {
    day: 1,
    name: "Run/Walk Intervals",
    exercises: [
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
      {
        name: "Run/Walk Intervals",
        description: "1min run x 30s recovery (jog or walk) - repeat 10 times",
        icon: "TODO",
      },
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
    ],
    estimatedDuration: "25 mins",
  },

  recoveryRun30: {
    day: 2,
    name: "Recovery Run",
    exercises: [
      {
        name: "Recovery Run",
        description: "30 min run or 4k",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  expertStrengthTraining: {
    day: 3,
    name: "Strength training",
    exercises: [
      {
        name: "DB Squat Thrusts",
        description: "12 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "KB swings",
        description: "12 reps / 3 sets (can be done with a DB too)",
        icon: "TODO",
      },
      {
        name: "DB Chest press",
        description: "12 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Glute Bridge",
        description: "12 reps / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Single Leg Deadlift",
        description: "10 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Alternating Renegade Row",
        description: "12 reps/ 3sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "45s / 2 sets",
        icon: "TODO",
      },
    ],
  },

  longRun35: {
    day: 4,
    name: "Long Run",
    exercises: [
      {
        name: "Long Run",
        description: "35mins or 6k",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  advancedOvulationRunWalk: {
    day: 1,
    name: "Run/ Walk Intervals",
    exercises: [
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
      {
        name: "Run/Walk Intervals",
        description:
          "2:30min run x 1min recovery (jog or walk) - repeat 10 times",
        icon: "TODO",
      },
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  longRun40Advanced: {
    day: 3,
    name: "Long Run",
    exercises: [
      {
        name: "Long Run",
        description: "40min or 7k",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  advancedLutealRunWalk: {
    day: 1,
    name: "Run/ Walk Intervals",
    exercises: [
      {
        name: "5min walk",
        description: "5min walk",
        icon: "TODO",
      },
      {
        name: "Run/Walk Intervals",
        description: "4mins run x 1min recovery (walk or jog) - repeat 8 times",
        icon: "TODO",
      },
      {
        name: "5mins walk",
        description: "5mins walk",
        icon: "TODO",
      },
    ],
    estimatedDuration: "50 mins",
  },

  recoveryRun25Advanced: {
    day: 2,
    name: "Recovery Run",
    exercises: [
      {
        name: "Recovery Run",
        description: "25mins",
        icon: "TODO",
      },
    ],
    estimatedDuration: "25 mins",
  },

  expertLutealStrength: {
    day: 4,
    name: "Strength training",
    exercises: [
      {
        name: "DB Squat Thrusts",
        description: "15 reps/ 3 sets",
        icon: "TODO",
      },
      {
        name: "KB swings",
        description: "15 reps / 3 sets (can be done with a DB too)",
        icon: "TODO",
      },
      {
        name: "DB Chest press",
        description: "15 reps each side/ 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Glute Bridge",
        description: "15 reps / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Single Leg Deadlift",
        description: "12 reps each side / 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Alternating Renegade Row",
        description: "20 reps/ 3sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "45s / 2 sets",
        icon: "TODO",
      },
    ],
  },

  longRun45: {
    day: 3,
    name: "Long Run",
    exercises: [
      {
        name: "Long Run",
        description: "45mins or 8k",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  // Strength Beginner workouts
  beginnerFullBodyMenstrual: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "BW squats",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "BW lunges",
        description: "10 each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "Bent over row machine",
        description:
          "10 each side x 2 sets (Alternate: Single arm bent over row)",
        icon: "TODO",
      },
      {
        name: "Shoulder press machine",
        description: "10 reps x 2 sets (Alternate: DB shoulder press)",
        icon: "TODO",
      },
      {
        name: "Plank",
        description:
          "30s x 2 sets (For beginners, knees should be on the floor)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  pilatesLowImpact: {
    day: 2,
    name: "Pilates Class or Low impact Workout",
    exercises: [
      {
        name: "Glute Bridges",
        description: "10 reps x3 sets",
        icon: "TODO",
      },
      {
        name: "Clamshells",
        description: "10 each side x 3 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder Taps",
        description: "12 alternating reps x 3sets (alternate legs)",
        icon: "TODO",
      },
      {
        name: "Bird Dog",
        description: "6 reps each side x 2sets",
        icon: "TODO",
      },
      {
        name: "Dead Bug (beginner version)",
        description: "6 each side x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "25 mins",
  },

  yogaStretching: {
    day: 3,
    name: "Yoga Class or Stretching",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s each leg x2 sets",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s each leg x2 sets",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Shoulder stretch",
        description: "30s each arm",
        icon: "TODO",
      },
    ],
    estimatedDuration: "20 mins",
  },

  follicularFullBody: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "Step ups",
        description: "12 each side x 3 sets",
        icon: "TODO",
      },
      {
        name: "Goblet Squat",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Chest press machine",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Bent over row machine",
        description: "10 reps x 3sets (Alternate: Single arm bent over row)",
        icon: "TODO",
      },
      {
        name: "Shoulder press machine",
        description: "10 reps x 3sets (Alternate: DB shoulder press)",
        icon: "TODO",
      },
      {
        name: "Deadbugs",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  beginnerLowerBody: {
    day: 2,
    name: "Lower Body",
    exercises: [
      {
        name: "Leg press",
        description: "10 reps x 3sets (Alternate: Goblet Squat)",
        icon: "TODO",
      },
      {
        name: "DB deadlift",
        description: "10 reps x 3sets (Alternate: Hamstring Machine)",
        icon: "TODO",
      },
      {
        name: "Lunges",
        description: "12 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Glute Bridge",
        description: "15 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Clamshells",
        description: "12 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "10 x 3sets (For beginners, knees should be on the floor)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  beginnerUpperBody: {
    day: 3,
    name: "Upper Body",
    exercises: [
      {
        name: "Shoulder press machine",
        description: "10 reps x 3 sets (Alternate: DB shoulder press)",
        icon: "TODO",
      },
      {
        name: "Single-arm bent over rows",
        description: "10 reps x 3 sets with DB",
        icon: "TODO",
      },
      {
        name: "Seated Chest Press Machine",
        description: "10 reps x 3 sets (Alternate: DB chest press)",
        icon: "TODO",
      },
      {
        name: "Lateral raises",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Tricep Kickbacks",
        description: "10 reps x 2 sets (Alternate: Chair dips)",
        icon: "TODO",
      },
      {
        name: "Shoulder Taps",
        description: "12 reps x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  lutealFullBody: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "Goblet OR BW Squats with heels elevated",
        description: "10x3 sets (comfortable weights)",
        icon: "TODO",
      },
      {
        name: "Step ups",
        description: "12 each side x 3 sets",
        icon: "TODO",
      },
      {
        name: "Seated Chest Press Machine",
        description: "10 x 3sets (Alternate: DB chest press)",
        icon: "TODO",
      },
      {
        name: "Bent Over Row Machine",
        description: "10 x 3sets (Alternate: Single arm bent over row)",
        icon: "TODO",
      },
      {
        name: "Seated Shoulder Press",
        description: "10 x 3sets (Alternate: DB shoulder press)",
        icon: "TODO",
      },
      {
        name: "Plank",
        description:
          "30sec x 2 sets (For beginners, knees should be on the floor)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  lutealLowerBody: {
    day: 2,
    name: "Lower Body",
    exercises: [
      {
        name: "Leg press",
        description: "10 x 3sets (Alternate: Goblet Squat)",
        icon: "TODO",
      },
      {
        name: "DB deadlift",
        description: "10 x 3sets (Alternate: Hamstring Machine)",
        icon: "TODO",
      },
      {
        name: "Static Lunges",
        description: "10 each side x 2sets",
        icon: "TODO",
      },
      {
        name: "Glute Bridge",
        description: "10 x 3sets",
        icon: "TODO",
      },
      {
        name: "Clamshells",
        description: "12 each side x 2sets",
        icon: "TODO",
      },
      {
        name: "Bird Dog",
        description: "10 each side x 2sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  lutealUpperBody: {
    day: 3,
    name: "Upper Body",
    exercises: [
      {
        name: "Shoulder press machine",
        description: "10 x 3 sets (Alternate: DB shoulder press)",
        icon: "TODO",
      },
      {
        name: "Single-arm bent over rows",
        description: "10 x 3 sets",
        icon: "TODO",
      },
      {
        name: "Seated Chest Press Machine",
        description: "10 x 3 sets (Alternate: DB chest press)",
        icon: "TODO",
      },
      {
        name: "Lateral raises",
        description: "12 x 2 sets",
        icon: "TODO",
      },
      {
        name: "Chair/bench dips",
        description: "10 x 2 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder Taps",
        description: "12 x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  // Strength mobility workout
  strengthMobilityWorkout: {
    day: 1,
    name: "Mobility",
    exercises: [
      {
        name: "Hip Rotations",
        description: "10reps each side",
        icon: "TODO",
      },
      {
        name: "Glute Bridges",
        description: "10 reps x 2sets",
        icon: "TODO",
      },
      {
        name: "Frog Squats",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "T-Spine Rotation",
        description: "6 reps each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "Arm Rotations and Shoulder Rolls",
        description: "30sec",
        icon: "TODO",
      },
    ],
  },

  // Strength stretch workout
  strengthStretchWorkout: {
    day: 1,
    name: "Stretch",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad stretch",
        description: "30s each leg",
        icon: "TODO",
      },
      {
        name: "Shoulder stretch",
        description: "30s each arm",
        icon: "TODO",
      },
    ],
  },

  // Intermediate Strength workouts
  intermediateFullBodyMenstrual: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "Goblet/DB Squats",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Reverse Lunges",
        description: "12 each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "Single Arm Bent Over Row",
        description: "10 each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "Dumbbell Shoulder Press",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Walkouts",
        description: "8 reps x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  intermediatePilatesLowImpact: {
    day: 2,
    name: "Pilates Class or Low impact Workout",
    exercises: [
      {
        name: "Glute Bridges March",
        description: "10 reps x3 sets",
        icon: "TODO",
      },
      {
        name: "Butterfly Bridges",
        description: "10 each side x 3 sets",
        icon: "TODO",
      },
      {
        name: "Side Plank (Knees)",
        description: "30s each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "45s x 2sets",
        icon: "TODO",
      },
      {
        name: "Slow Mountain Climbers",
        description: "12 x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "30 mins",
  },

  intermediateYogaStretching: {
    day: 3,
    name: "Yoga Class or Stretching",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Supine Stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Shoulder Stretch",
        description: "30s",
        icon: "TODO",
      },
    ],
    estimatedDuration: "25 mins",
  },

  intermediateFollicularFullBody: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "DB Squats",
        description: "12 each side reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Reverse lunges",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "DB Shoulder Press",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Lat Pulldown",
        description: "10 x 3sets (Alternate: DB bent over rows)",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "10 x 3sets (If needed on knees)",
        icon: "TODO",
      },
      {
        name: "V-Boat",
        description: "10 x 3sets (Alternate: Deadbugs)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  intermediateLowerBody: {
    day: 2,
    name: "Lower Body",
    exercises: [
      {
        name: "Leg press",
        description: "10 reps x 3sets (Alternate: DB Squat)",
        icon: "TODO",
      },
      {
        name: "DB deadlift",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "DB Alternating Lunges",
        description: "12 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "DB Hip Thrust",
        description: "15 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Abductor Machine",
        description:
          "12 each side x 3sets (Alternate: Clamshells with resistance)",
        icon: "TODO",
      },
      {
        name: "Calf Raises",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  intermediateUpperBody: {
    day: 3,
    name: "Upper Body",
    exercises: [
      {
        name: "DB Chest Press",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Face Pulls",
        description: "10 reps x 3 sets (Alternate: bent-over rear delt fly)",
        icon: "TODO",
      },
      {
        name: "Front Raises",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Lateral raises",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Press ups",
        description: "5 reps x 3 sets (knees on the floor if needed)",
        icon: "TODO",
      },
      {
        name: "Cross Body Mountain Climbers",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  intermediateLutealFullBody: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "DB Squat",
        description: "10 reps x3 sets",
        icon: "TODO",
      },
      {
        name: "Reverse lunges",
        description: "15 reps each side x 3 sets (no weight)",
        icon: "TODO",
      },
      {
        name: "Lat Pulldown",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "DB Shoulder Press",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Walkouts",
        description: "10 reps x 2sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "30sec x 2 sets (on knees if needed)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  intermediateLutealLowerBody: {
    day: 2,
    name: "Lower Body",
    exercises: [
      {
        name: "Leg press",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "DB deadlift",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "DB Alternating Lunges",
        description: "10 each side x 2sets",
        icon: "TODO",
      },
      {
        name: "Hip Thrusts with low weight",
        description: "20 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Abductor Machine",
        description: "15 reps x 2sets (Alternate: Clamshells with resistance)",
        icon: "TODO",
      },
      {
        name: "V-boat",
        description: "12 reps x 2 sets (Alternate: Deadbugs)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  intermediateLutealUpperBody: {
    day: 3,
    name: "Upper Body",
    exercises: [
      {
        name: "DB Chest Press",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Face Pulls",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Front Raises",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Lateral raises",
        description: "12 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Press ups",
        description: "5 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Cross Body Mountain Climbers",
        description: "12 reps x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  // Advanced Strength workouts
  advancedFullBodyMenstrual: {
    day: 1,
    name: "Full body",
    exercises: [
      {
        name: "Glute Bridges",
        description: "15 reps x 3sets (Either BW or low weights)",
        icon: "TODO",
      },
      {
        name: "Static Lunges",
        description: "12 each side x 2 sets",
        icon: "TODO",
      },
      {
        name: "DB Renegade Rows",
        description: "16 (alternating) x 3 sets (with low weight)",
        icon: "TODO",
      },
      {
        name: "Face pulls",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Plank",
        description: "45s x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  advancedPilatesLowImpact: {
    day: 2,
    name: "Pilates Class or Low impact Workout",
    exercises: [
      {
        name: "Donkey Kicks",
        description: "10 reps x3 sets",
        icon: "TODO",
      },
      {
        name: "Banded Clamshells",
        description: "10 each side x 3 sets",
        icon: "TODO",
      },
      {
        name: "Cross Body Mountain Climbers",
        description: "16 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder Taps",
        description: "16 reps x 2sets",
        icon: "TODO",
      },
      {
        name: "Walkouts",
        description: "12 x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "35 mins",
  },

  advancedYogaStretching: {
    day: 3,
    name: "Yoga Class or Stretching",
    exercises: [
      {
        name: "Child pose",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cat Cow",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Hamstring stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Number 4 stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Supine stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Cobra stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Shoulder Stretch",
        description: "30s",
        icon: "TODO",
      },
      {
        name: "Quad Stretch",
        description: "30s",
        icon: "TODO",
      },
    ],
    estimatedDuration: "25 mins",
  },

  advancedFollicularUpperBody: {
    day: 1,
    name: "Upper Body",
    exercises: [
      {
        name: "Lat Pulldown",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Seated Cable Row Machine",
        description: "10 reps x 3 sets (Alternate: DB bent over rows)",
        icon: "TODO",
      },
      {
        name: "DB Renegade Rows",
        description: "10 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Bicep Curls",
        description: "10 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Cable Tricep Pushdown",
        description: "10 reps x 3 sets (Alternate: chair/bench dips)",
        icon: "TODO",
      },
      {
        name: "Deadbugs",
        description: "20 reps x 3sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  advancedFollicularLowerBody: {
    day: 2,
    name: "Lower Body",
    exercises: [
      {
        name: "BB Hip Thrust",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "DB Bulgarian Squats",
        description: "10 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Goblet Squat",
        description: "12 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "DB Single Leg Deadlift",
        description: "10 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Leg extension",
        description: "10 reps x 3sets (Alternate: step ups with DB)",
        icon: "TODO",
      },
      {
        name: "Banded Clam Shells",
        description: "10 reps x 3sets (Use a strong/challenging band)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "50 mins",
  },

  advancedFollicularUpperBody2: {
    day: 3,
    name: "Upper Body",
    exercises: [
      {
        name: "BB Shoulder Press",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Face Pulls",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Around the Worlds",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Front to Lateral Raises",
        description: "10 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Shoulder and Heel Taps",
        description: "16 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Quick Mountain Climbers",
        description: "16 reps x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  advancedFollicularLowerBody2: {
    day: 4,
    name: "Lower Body",
    exercises: [
      {
        name: "BB Deadlift",
        description: "10 reps x3 sets",
        icon: "TODO",
      },
      {
        name: "Leg Press",
        description: "10 reps x 3 sets (Alternate: DB or BB squat)",
        icon: "TODO",
      },
      {
        name: "DB Glute Bridges",
        description: "12 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Abductor Machine",
        description: "12 reps x 3sets (Alternate: Crab walks with band)",
        icon: "TODO",
      },
      {
        name: "Calf Raises Machine or Holding Weight",
        description: "12 reps x 3sets (Use either a machine or hold DB)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "50 mins",
  },

  advancedLutealUpperBody: {
    day: 1,
    name: "Upper Body",
    exercises: [
      {
        name: "Lat Pulldown",
        description: "12 x 3 sets (Alternate: DB bent over rows)",
        icon: "TODO",
      },
      {
        name: "Seated Cable Row Machine",
        description: "12 x 3sets (Alternate: face pulls)",
        icon: "TODO",
      },
      {
        name: "Renegade Rows",
        description: "15 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Bicep Curls",
        description: "15 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Cable Tricep Pushdown",
        description: "15 reps x 3 sets (Alternate: chair/bench dips)",
        icon: "TODO",
      },
      {
        name: "Deadbugs",
        description: "24 x 2 sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  advancedLutealLowerBody: {
    day: 2,
    name: "Lower Body",
    exercises: [
      {
        name: "DB or BB Hip Thrust",
        description:
          "12 reps x 3sets (Can use either DB or BB, whichever is most comfortable)",
        icon: "TODO",
      },
      {
        name: "Bulgarian Squats",
        description: "12 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Goblet Squat",
        description: "12 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Single Leg Deadlift",
        description: "15 each side x 3sets",
        icon: "TODO",
      },
      {
        name: "Leg extension",
        description: "15 reps x 3sets (Alternate: Crab walks with band)",
        icon: "TODO",
      },
      {
        name: "Clam shells",
        description: "15 reps x 3sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  advancedLutealUpperBody2: {
    day: 3,
    name: "Upper Body",
    exercises: [
      {
        name: "BB Shoulder Press",
        description: "12 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Face Pulls",
        description: "12 reps x 3sets (Alternate: bent-over rear delt fly)",
        icon: "TODO",
      },
      {
        name: "Around the Worlds",
        description: "15 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Front to Lateral Raises",
        description: "15 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Shoulder and Heel Taps",
        description: "20 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Paced Mountain Climbers",
        description: "24 reps x 3 sets (Don't go quickly)",
        icon: "TODO",
      },
    ],
    estimatedDuration: "45 mins",
  },

  advancedLutealLowerBody2: {
    day: 4,
    name: "Lower Body",
    exercises: [
      {
        name: "DB OR BB Deadlift",
        description: "12 reps x 3 sets",
        icon: "TODO",
      },
      {
        name: "Leg Press",
        description: "12 reps x 3 sets (Alternate: DB or BB squat)",
        icon: "TODO",
      },
      {
        name: "DB Glute Bridges",
        description: "15 reps x 3sets",
        icon: "TODO",
      },
      {
        name: "Abductor Machine",
        description: "20 reps x 2sets",
        icon: "TODO",
      },
      {
        name: "Calf Raises Machine or Holding Weight",
        description: "20 reps x 2sets",
        icon: "TODO",
      },
    ],
    estimatedDuration: "40 mins",
  },

  // Advanced strength mobility workouts
  advancedStrengthLowerMobility: {
    day: 1,
    name: "Lower Body Mobility",
    exercises: [
      {
        name: "Hip Rotations",
        description: "10reps each side",
        icon: "TODO",
      },
      {
        name: "Glute Bridges",
        description: "10 reps x 2sets",
        icon: "TODO",
      },
      {
        name: "Frog Squats",
        description: "10 reps x 2 sets",
        icon: "TODO",
      },
      {
        name: "Leg Swings",
        description: "10 reps each leg x 2 sets",
        icon: "TODO",
      },
      {
        name: "Lateral Leg Swings",
        description: "10 reps each leg x 2 sets",
        icon: "TODO",
      },
    ],
  },

  advancedStrengthUpperMobility: {
    day: 1,
    name: "Upper Body Mobility",
    exercises: [
      {
        name: "Arm Circles + Shoulder Rolls",
        description: "30 sec",
        icon: "TODO",
      },
      {
        name: "Cat-Cow",
        description: "8 reps x 2",
        icon: "TODO",
      },
      {
        name: "T-Spine Rotation",
        description: "6 reps x 2",
        icon: "TODO",
      },
      {
        name: "Banded Pull-Aparts",
        description: "10 reps",
        icon: "TODO",
      },
    ],
  },
};

export const runPlans: Plan = {
  beginner: {
    name: "Running Beginner",
    level: "Beginner",
    requirements: "No previous running experience required",
    icon: require("@/assets/images/strength/strength-small.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.gentleWalk,
          workoutLibrary.beginnerRunWalk,
          workoutLibrary.basicStretch,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.follicularRunWalk,
          workoutLibrary.beginnerStrength,
          workoutLibrary.follicularRunWalkBasic,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.ovulationRunWalk,
          workoutLibrary.beginnerStrength,
          workoutLibrary.ovulationRunWalkAdvanced,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.lutealRunWalk,
          workoutLibrary.lutealStrength,
          workoutLibrary.lutealRunWalkLong,
        ],
      },
    },
    mobility: workoutLibrary.mobilityWorkout,
    stretch: workoutLibrary.stretchWorkout,
  },
  intermediateBeginner: {
    name: "Running Intermediate Beginner",
    level: "Intermediate Beginner",
    requirements: "Some previous running experience recommended",
    icon: require("@/assets/images/strength/strength-small.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.gentleWalk,
          workoutLibrary.beginnerRunWalk,
          workoutLibrary.basicStretch,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.intermediateRunWalk1,
          workoutLibrary.intermediateStrength,
          workoutLibrary.intermediateRunWalkShort,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.intermediateRunWalk2,
          workoutLibrary.intermediateStrength,
          workoutLibrary.intermediateRunWalkLong,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.continuousRun15,
          workoutLibrary.advancedStrength,
          workoutLibrary.advancedRunWalk,
        ],
      },
    },
    mobility: workoutLibrary.mobilityWorkout,
    stretch: workoutLibrary.stretchWorkout,
  },
  intermediateAdvanced: {
    name: "Running Intermediate Advanced",
    level: "Intermediate Advanced",
    requirements: "Solid running foundation and experience with longer runs",
    icon: require("@/assets/images/strength/strength-medium.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.longWalk,
          workoutLibrary.walkOrJog,
          workoutLibrary.advancedStretchYoga,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.follicularRunWalkAdvanced,
          workoutLibrary.recoveryRun25,
          workoutLibrary.advancedStrengthTraining,
          workoutLibrary.longRun30,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.ovulationRunWalkAdvanced2,
          workoutLibrary.recoveryRun25,
          workoutLibrary.advancedStrengthTraining,
          workoutLibrary.longRun30,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.lutealRunWalkAdvanced,
          workoutLibrary.recoveryRun25,
          workoutLibrary.lutealStrengthAdvanced,
          workoutLibrary.longRun40,
        ],
      },
    },
    mobility: workoutLibrary.advancedMobilityWorkout,
    stretch: workoutLibrary.advancedStretchWorkout,
  },
  advanced: {
    name: "Running Advanced",
    level: "Advanced",
    requirements: "Experienced runner with strong endurance base",
    icon: require("@/assets/images/strength/strength-large.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.longWalk,
          workoutLibrary.walkOrJog30,
          workoutLibrary.advancedStretchYoga,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.advancedFollicularRunWalk,
          workoutLibrary.recoveryRun30,
          workoutLibrary.expertStrengthTraining,
          workoutLibrary.longRun35,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.advancedOvulationRunWalk,
          workoutLibrary.recoveryRun30,
          workoutLibrary.expertStrengthTraining,
          workoutLibrary.longRun40Advanced,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.advancedLutealRunWalk,
          workoutLibrary.recoveryRun25Advanced,
          workoutLibrary.expertLutealStrength,
          workoutLibrary.longRun45,
        ],
      },
    },
    mobility: workoutLibrary.advancedMobilityWorkout,
    stretch: workoutLibrary.advancedStretchWorkout,
  },
};

export const strengthPlans: Plan = {
  beginner: {
    name: "Strength Beginner",
    level: "Beginner",
    requirements: "No previous strength training experience required",
    icon: require("@/assets/images/strength/strength-small.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.beginnerFullBodyMenstrual,
          workoutLibrary.pilatesLowImpact,
          workoutLibrary.yogaStretching,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.follicularFullBody,
          workoutLibrary.beginnerLowerBody,
          workoutLibrary.beginnerUpperBody,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.follicularFullBody,
          workoutLibrary.beginnerLowerBody,
          workoutLibrary.beginnerUpperBody,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.lutealFullBody,
          workoutLibrary.lutealLowerBody,
          workoutLibrary.lutealUpperBody,
        ],
      },
    },
    mobility: workoutLibrary.strengthMobilityWorkout,
    stretch: workoutLibrary.strengthStretchWorkout,
  },
  intermediate: {
    name: "Strength Intermediate",
    level: "Intermediate",
    requirements: "Some strength training experience with basic form knowledge",
    icon: require("@/assets/images/strength/strength-medium.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.intermediateFullBodyMenstrual,
          workoutLibrary.intermediatePilatesLowImpact,
          workoutLibrary.intermediateYogaStretching,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.intermediateFollicularFullBody,
          workoutLibrary.intermediateLowerBody,
          workoutLibrary.intermediateUpperBody,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.intermediateFollicularFullBody,
          workoutLibrary.intermediateLowerBody,
          workoutLibrary.intermediateUpperBody,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.intermediateLutealFullBody,
          workoutLibrary.intermediateLutealLowerBody,
          workoutLibrary.intermediateLutealUpperBody,
        ],
      },
    },
    mobility: workoutLibrary.strengthMobilityWorkout,
    stretch: workoutLibrary.strengthStretchWorkout,
  },
  advanced: {
    name: "Strength Advanced",
    level: "Advanced",
    requirements:
      "Extensive strength training experience with advanced movements",
    icon: require("@/assets/images/strength/strength-large.png"),
    phases: {
      menstrual: {
        workouts: [
          workoutLibrary.advancedFullBodyMenstrual,
          workoutLibrary.advancedPilatesLowImpact,
          workoutLibrary.advancedYogaStretching,
        ],
      },
      follicular: {
        workouts: [
          workoutLibrary.advancedFollicularUpperBody,
          workoutLibrary.advancedFollicularLowerBody,
          workoutLibrary.advancedFollicularUpperBody2,
          workoutLibrary.advancedFollicularLowerBody2,
        ],
      },
      ovulation: {
        workouts: [
          workoutLibrary.advancedFollicularUpperBody,
          workoutLibrary.advancedFollicularLowerBody,
          workoutLibrary.advancedFollicularUpperBody2,
          workoutLibrary.advancedFollicularLowerBody2,
        ],
      },
      luteal: {
        workouts: [
          workoutLibrary.advancedLutealUpperBody,
          workoutLibrary.advancedLutealLowerBody,
          workoutLibrary.advancedLutealUpperBody2,
          workoutLibrary.advancedLutealLowerBody2,
        ],
      },
    },
    mobility: workoutLibrary.advancedStrengthLowerMobility,
    stretch: workoutLibrary.strengthStretchWorkout,
  },
};
