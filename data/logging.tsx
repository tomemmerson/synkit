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
} from "./workouts";

export type Flow = "light" | "medium" | "heavy" | "very-heavy";

export type Symptoms =
  | "cramps"
  | "bloating"
  | "mood-swings"
  | "headaches"
  | "fatigue";

export type Mood = "happy" | "sad" | "neutral" | "angry" | "overwhelmed";

export interface LogDays {
  [date: string]: {
    period?: {
      flow?: Flow;
      symptoms: Symptoms[];
    };
    mood?: Mood;
  };
}

export function dateToString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export interface SettingsActions {
  logPeriod: (day: Date, flow?: Flow) => void;
  logMood: (day: Date, mood: string) => void;
  dayLog: (day: Date) => LogDays[string] | undefined;
  setWorkoutPlan: (plan: WorkoutPlanType) => void;
  setWorkoutLevel: (level: string) => void;
  getCurrentPlan: () => WorkoutPlan | undefined;
  setName: (name: string) => void;
  setInitialPeriodDate: (date: Date) => void;
  calculateCurrentPhase: () => PhaseType | undefined;
  getLastPeriodStartDate: () => Date | undefined;
  getPeriodDay: () => number | undefined;
  getCurrentWorkouts: () => Workout[] | undefined;
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
      logPeriod: (day, flow?: Flow) => {
        set((state) => {
          const dateKey = dateToString(day);
          return {
            days: {
              ...state.days,
              [dateKey]: {
                ...state.days[dateKey],
                period: {
                  flow: flow,
                  symptoms: [],
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
        set({ initialPeriodDate: date });
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
      getPeriodDay: () => {
        const lastPeriodStart = get().getLastPeriodStartDate();

        if (!lastPeriodStart) {
          return undefined;
        }

        const today = new Date();
        const diffTime = today.getTime() - lastPeriodStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return diffDays; // Returns the number of days since the last period started
      },
      calculateCurrentPhase: () => {
        const lastPeriodStart = get().getLastPeriodStartDate();

        if (!lastPeriodStart) {
          return undefined; // We don't have a last period date
        }

        const today = new Date();
        const diffTime = today.getTime() - lastPeriodStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 5) return "menstrual"; // First 5 days
        if (diffDays < 14) return "follicular"; // Days 6-13
        if (diffDays < 20) return "ovulation"; // Days 14-19
        return "luteal"; // Days 20 and onwards
      },
      getCurrentWorkouts: () => {
        const plan = get().getCurrentPlan();
        if (!plan) return undefined;

        const phase = get().calculateCurrentPhase();
        if (!phase) return undefined;

        const section = plan.phases[phase]?.workouts;
        return section ? section : undefined;
      },
    }),
    { name: "settings", storage: createJSONStorage(() => AsyncStorage) }
  )
);
