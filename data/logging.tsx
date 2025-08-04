import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      flow: Flow;
      symptoms: Symptoms[];
    };
    mood?: Mood;
  };
}

export function dateToString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export interface SettingsActions {
  logPeriod: (day: Date, period: string) => void;
  logMood: (day: Date, mood: string) => void;
  dayLog: (day: Date) => LogDays[string] | undefined;
}

export const useLogging = create<
  {
    days: LogDays;
  } & SettingsActions
>()(
  persist(
    (set, get) => ({
      days: {},
      logPeriod: (day, period) => {
        set((state) => {
          const dateKey = dateToString(day);
          return {
            days: {
              ...state.days,
              [dateKey]: {
                ...state.days[dateKey],
                period: {
                  flow: period as Flow,
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
    }),
    { name: "settings", storage: createJSONStorage(() => AsyncStorage) }
  )
);
