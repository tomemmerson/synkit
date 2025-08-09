import { ImageSourcePropType } from "react-native";

type Exercise = {
  name: string;
  description: string;
  icon: string;
};

export type Workout = {
  day: number;
  name: string;
  estimatedDuration?: string;
  difficulty: "Medium" | "High" | "Low";
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

export const runPlans: Plan = {
  beginner: {
    name: "Running Beginner",
    level: "Beginner",
    requirements: "No previous running experience required",
    icon: require("@/assets/images/strength/strength-small.png"),
    phases: {
      menstrual: {
        workouts: [
          {
            day: 1,
            name: "Walk",
            exercises: [
              {
                name: "Walk",
                description: "20-30mins",
                icon: "TODO",
              },
            ],
            estimatedDuration: "30 mins",
          },
          {
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
          {
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
        ],
      },
      follicular: {
        workouts: [
          {
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
          {
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
          {
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
        ],
      },
      ovulation: {
        workouts: [
          {
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
          {
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
          {
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
        ],
      },
      luteal: {
        workouts: [
          {
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
          {
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
          {
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
        ],
      },
    },
    mobility: {
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
    stretch: {
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
  },
  intermediateBeginner: {
    name: "Running Intermediate Beginner",
    level: "Intermediate Beginner",
    requirements: "Some previous running experience recommended",
    icon: require("@/assets/images/strength/strength-small.png"),
    phases: {
      menstrual: {
        workouts: [
          {
            day: 1,
            name: "Walk",
            exercises: [
              {
                name: "Walk",
                description: "20-30mins",
                icon: "TODO",
              },
            ],
          },
          {
            day: 2,
            name: "Run/Walk",
            exercises: [
              {
                name: "Run/Walk Intervals",
                description: "1 min slow run/ 2 min walk - Repeat this 5 times",
                icon: "TODO",
              },
            ],
          },
          {
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
        ],
      },
      follicular: {
        workouts: [
          {
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
          {
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
          {
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
        ],
      },
      ovulation: {
        workouts: [
          {
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
          {
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
          {
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
        ],
      },
      luteal: {
        workouts: [
          {
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
          {
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
          {
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
        ],
      },
    },
    mobility: {
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
    stretch: {
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
  },
};

export const strengthPlans: Plan = {};
