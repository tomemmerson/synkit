import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  WorkoutPlanType,
  WorkoutLevel,
  runPlans,
  strengthPlans,
  WorkoutPlan,
  PhaseType,
  Workout,
  WorkoutID,
} from "./workouts";

export type Flow = "light" | "medium" | "heavy" | "very-heavy";

export type Symptoms =
  | "cramps"
  | "bloating"
  | "mood-swings"
  | "headaches"
  | "fatigue";

export type Mood = "happy" | "sad" | "neutral" | "angry" | "overwhelmed";

export type WorkoutCompletion = {
  workoutId: WorkoutID;
  workoutName: string;
  planType: WorkoutPlanType;
  planLevel: WorkoutLevel;
  phase: PhaseType;
  completedAt: string; // ISO timestamp
  duration?: number; // minutes
  exercisesCompleted: number;
  totalExercises: number;
};

export interface LogDays {
  [date: string]: {
    period?: {
      flow?: Flow;
      symptoms: Symptoms[];
    };
    mood?: Mood;
    workouts?: WorkoutCompletion[];
  };
}

export function dateToString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export interface SettingsActions {
  logPeriod: (day: Date, flow: Flow, symptoms: Symptoms[]) => void;
  logMood: (day: Date, mood: string) => void;
  dayLog: (day: Date) => LogDays[string] | undefined;
  setWorkoutPlan: (plan: WorkoutPlanType) => void;
  setWorkoutLevel: (level: string) => void;
  getCurrentPlan: () => WorkoutPlan | undefined;
  setName: (name: string) => void;
  setInitialPeriodDate: (date: Date) => void;
  calculateCurrentPhase: (date?: Date) => PhaseType | undefined;
  getLastPeriodStartDate: () => Date | undefined;
  getPeriodDay: (date?: Date) => number | undefined;
  getCurrentWorkouts: (hideCompleted?: boolean) => Workout[] | undefined;
  logWorkoutCompletion: (
    day: Date,
    workoutId: string,
    workoutName: string,
    exercisesCompleted: number,
    totalExercises: number,
    duration?: number
  ) => void;
  getWorkoutCompletions: (day?: Date) => WorkoutCompletion[];
  getWorkoutHistory: (days?: number) => WorkoutCompletion[];
  hasCompletedWorkout: (day?: Date) => boolean;
  workoutsCompletedInPhase: (
    planType: WorkoutPlanType,
    planLevel: WorkoutLevel,
    phase: PhaseType
  ) => WorkoutCompletion[];
  isWorkoutComplete: (workout: Workout, days?: number) => boolean;
  clearWorkoutHistory: () => void;
}

export const useLogging = create<
  {
    days: LogDays;
    currentWorkoutPlan?: WorkoutPlanType;
    currentWorkoutLevel?: WorkoutLevel;
    name: string;
    initialPeriodDate?: string;
  } & SettingsActions
>()(
  persist(
    (set, get) => ({
      days: {},
      currentWorkoutPlan: undefined,
      currentWorkoutLevel: undefined,
      name: "",
      initialPeriodDate: undefined,
      getCurrentPlan: () => {
        let plan = get().currentWorkoutPlan;
        let level = get().currentWorkoutLevel;

        if (!plan || !level) {
          return undefined;
        }

        if (plan === "running") {
          return runPlans[level];
        }
        if (plan === "strength") {
          return strengthPlans[level];
        }

        return undefined;
      },
      logPeriod: (day, flow: Flow, symptoms: Symptoms[]) => {
        set((state) => {
          const dateKey = dateToString(day);
          return {
            days: {
              ...state.days,
              [dateKey]: {
                ...state.days[dateKey],
                period: {
                  flow: flow,
                  symptoms: symptoms || [],
                },
              },
            },
          };
        });
      },
      logMood: (day, mood) => {
        set((state) => {
          const dateKey = dateToString(day);
          return {
            days: {
              ...state.days,
              [dateKey]: {
                ...state.days[dateKey],
                mood: mood as Mood,
              },
            },
          };
        });
      },
      dayLog: (day) => {
        const dateKey = dateToString(day);
        return get().days[dateKey];
      },
      setWorkoutPlan: (plan) => {
        set({ currentWorkoutPlan: plan });
      },
      setWorkoutLevel: (level) => {
        set({ currentWorkoutLevel: level as WorkoutLevel });
      },
      setName: (name) => {
        set({ name });
      },
      setInitialPeriodDate: (date: Date) => {
        set({ initialPeriodDate: dateToString(date) });
      },
      getLastPeriodStartDate: () => {
        const { initialPeriodDate, days } = get();

        const periodKeys = Object.keys(days)
          .filter((k) => !!days[k]?.period?.flow)
          .sort(); // chronological (YYYY-MM-DD)

        // If no logs, fall back to initialPeriodDate (if any)
        if (periodKeys.length === 0) {
          return initialPeriodDate
            ? new Date(initialPeriodDate as any)
            : undefined;
        }

        const periodDates = periodKeys.map((k) => new Date(k));

        const MS_PER_DAY = 24 * 60 * 60 * 1000;
        const startOfDay = (d: Date) =>
          Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

        // Group logged period days into clusters with a leeway of 5 days
        const clusters: Date[][] = [];
        let current: Date[] = [];

        for (const d of periodDates) {
          if (current.length === 0) {
            current.push(d);
            continue;
          }
          const prev = current[current.length - 1];
          const diffDays = Math.floor(
            (startOfDay(d) - startOfDay(prev)) / MS_PER_DAY
          );
          if (diffDays <= 5) {
            current.push(d);
          } else {
            clusters.push(current);
            current = [d];
          }
        }
        if (current.length) clusters.push(current);

        const initDate = initialPeriodDate
          ? new Date(initialPeriodDate as any)
          : undefined;

        // If no initial date, return the start of the last cluster
        if (!initDate) {
          const lastCluster = clusters[clusters.length - 1];
          return lastCluster ? new Date(lastCluster[0]) : undefined;
        }

        // With an initial date, find the last cluster that starts after it
        const clustersAfterInit = clusters.filter(
          (c) => startOfDay(c[0]) > startOfDay(initDate)
        );

        if (clustersAfterInit.length > 0) {
          const last = clustersAfterInit[clustersAfterInit.length - 1];
          return new Date(last[0]);
        }

        // Otherwise, fall back to the initial date
        return new Date(initDate);
      },
      getPeriodDay: (selectedDate?: Date) => {
        const lastPeriodStart = get().getLastPeriodStartDate();

        if (!lastPeriodStart) {
          return undefined;
        }

        const today = selectedDate || new Date();
        const diffTime = today.getTime() - lastPeriodStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return diffDays; // Returns the number of days since the last period started
      },
      calculateCurrentPhase: (selectedDate?: Date) => {
        const lastPeriodStart = get().getLastPeriodStartDate();

        if (!lastPeriodStart) {
          return undefined; // We don't have a last period date
        }

        const today = selectedDate || new Date();
        const diffTime = today.getTime() - lastPeriodStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 5) return "menstrual"; // First 5 days
        if (diffDays < 14) return "follicular"; // Days 6-13
        if (diffDays < 20) return "ovulation"; // Days 14-19
        return "luteal"; // Days 20 and onwards
      },
      getCurrentWorkouts: (hideCompleted?: boolean) => {
        const plan = get().getCurrentPlan();
        if (!plan) return undefined;

        const phase = get().calculateCurrentPhase();
        if (!phase) return undefined;

        const section = plan.phases[phase]?.workouts;
        if (!section) return undefined;

        // If hideCompleted is false or undefined, return all workouts
        if (!hideCompleted) {
          return section;
        }

        // If hideCompleted is true, filter out completed workouts
        const currentPlan = get().currentWorkoutPlan;
        const currentLevel = get().currentWorkoutLevel;

        if (!currentPlan || !currentLevel) {
          return section; // Return all if we can't determine plan/level
        }

        // Get completed workouts for this plan, level, and phase
        const completedWorkouts = get().workoutsCompletedInPhase(
          currentPlan,
          currentLevel,
          phase
        );

        // Create a set of completed workout IDs for efficient lookup
        const completedWorkoutIds = new Set(
          completedWorkouts.map((completion) => completion.workoutId)
        );

        // Filter out workouts that have been completed
        const incompleteWorkouts = section.filter((workout) => {
          return !completedWorkoutIds.has(workout.id);
        });

        return incompleteWorkouts;
      },
      logWorkoutCompletion: (
        day: Date,
        workoutId: string,
        workoutName: string,
        exercisesCompleted: number,
        totalExercises: number,
        duration?: number
      ) => {
        const currentPlan = get().currentWorkoutPlan;
        const currentLevel = get().currentWorkoutLevel;
        const currentPhase = get().calculateCurrentPhase(day);

        if (!currentPlan || !currentLevel || !currentPhase) {
          console.warn(
            "Cannot log workout completion: missing plan/level/phase information"
          );
          return;
        }

        const completion: WorkoutCompletion = {
          workoutId,
          workoutName,
          planType: currentPlan,
          planLevel: currentLevel,
          phase: currentPhase,
          completedAt: new Date().toISOString(),
          duration,
          exercisesCompleted,
          totalExercises,
        };

        set((state) => {
          const dateKey = dateToString(day);
          const existingWorkouts = state.days[dateKey]?.workouts || [];

          return {
            days: {
              ...state.days,
              [dateKey]: {
                ...state.days[dateKey],
                workouts: [...existingWorkouts, completion],
              },
            },
          };
        });
      },
      getWorkoutCompletions: (day?: Date) => {
        const targetDay = day || new Date();
        const dateKey = dateToString(targetDay);
        return get().days[dateKey]?.workouts || [];
      },
      getWorkoutHistory: (days: number = 30) => {
        const { days: logDays } = get();
        const today = new Date();
        const history: WorkoutCompletion[] = [];

        for (let i = 0; i < days; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateKey = dateToString(date);
          const dayWorkouts = logDays[dateKey]?.workouts || [];
          history.push(...dayWorkouts);
        }

        return history.sort(
          (a, b) =>
            new Date(b.completedAt).getTime() -
            new Date(a.completedAt).getTime()
        );
      },
      hasCompletedWorkout: (day?: Date) => {
        const targetDay = day || new Date();
        const workouts = get().getWorkoutCompletions(targetDay);
        return workouts.length > 0;
      },
      workoutsCompletedInPhase: (
        planType: WorkoutPlanType,
        planLevel: WorkoutLevel,
        phase: PhaseType
      ) => {
        const { days: logDays } = get();
        const completions: WorkoutCompletion[] = [];

        // Iterate through all logged days
        Object.values(logDays).forEach((dayLog) => {
          if (dayLog.workouts) {
            // Filter workouts that match the specified plan, level, and phase
            const matchingWorkouts = dayLog.workouts.filter(
              (workout) =>
                workout.planType === planType &&
                workout.planLevel === planLevel &&
                workout.phase === phase
            );
            completions.push(...matchingWorkouts);
          }
        });

        // Sort by completion time (most recent first)
        return completions.sort(
          (a, b) =>
            new Date(b.completedAt).getTime() -
            new Date(a.completedAt).getTime()
        );
      },
      isWorkoutComplete: (workout: Workout, days: number = 10) => {
        const { days: logDays } = get();
        const today = new Date();
        const workoutId = workout.id;

        // Check the last N days for workout completions
        for (let i = 0; i < days; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateKey = dateToString(date);
          const dayWorkouts = logDays[dateKey]?.workouts || [];

          // Check if any workout completion matches this workout
          const isCompleted = dayWorkouts.some(
            (completion) => completion.workoutId === workoutId
          );

          if (isCompleted) {
            return true;
          }
        }

        return false;
      },
      clearWorkoutHistory: () => {
        set((state) => {
          const updatedDays = { ...state.days };

          // Remove workouts from all days while preserving other data (period, mood)
          Object.keys(updatedDays).forEach((dateKey) => {
            if (updatedDays[dateKey].workouts) {
              const { workouts, ...restOfDay } = updatedDays[dateKey];
              updatedDays[dateKey] = restOfDay;
            }
          });

          return {
            days: updatedDays,
          };
        });
      },
    }),
    { name: "settings", storage: createJSONStorage(() => AsyncStorage) }
  )
);
