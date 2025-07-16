import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  SheetDefinition,
  SheetProvider,
  registerSheet,
} from "react-native-actions-sheet";
import {
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { MenuProvider } from "react-native-popup-menu";

import { useColorScheme } from "@/hooks/useColorScheme";
import { setupMoodReminder, setupNotifications } from "@/data/notifications";
import * as Notifications from "expo-notifications";
import { useMoodStore } from "@/data/mood";
import { useSettings } from "@/data/settings";
import { DateTime } from "luxon";
import { Mixpanel } from "mixpanel-react-native";
import { AppState } from "react-native";
import { initializeTask, TASK_IDS } from "@/data/tasks";

const trackAutomaticEvents = false; //disable legacy mobile autotrack
const useNative = false; //disable Native Mode, use Javascript Mode
export const mixpanel = new Mixpanel(
  "1dd6856181042c06894dd991e5cfb78c",
  trackAutomaticEvents,
  useNative
);
mixpanel.init();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// initializeTask();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const mood = useMoodStore();
  const settings = useSettings();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log("App state changed to", nextAppState);
      if (nextAppState === "active") {
        mixpanel.track("App Opened", {
          date: DateTime.now().toISO(),
        });
        mixpanel.flush();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    if (settings.state.sendMoodReminders) {
      setupMoodReminder(mood.moodAvgs);
    }
  }, [mood.moodAvgs, settings.state.sendMoodReminders]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <KeyboardProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <MenuProvider>
          <SheetProvider context="global">
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen
                name="goal-modal/AddGoal"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="goal-modal/SetGoal"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="goal" options={{ headerShown: false }} />
              <Stack.Screen
                name="focus"
                options={{
                  headerShown: false,
                  freezeOnBlur: true,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false, gestureEnabled: false }}
              />
            </Stack>
            <StatusBar style="auto" />
          </SheetProvider>
        </MenuProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
