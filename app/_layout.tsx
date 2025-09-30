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
import { SheetProvider } from "react-native-actions-sheet";
import { MenuProvider } from "react-native-popup-menu";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useLogging } from "@/data/logging";
import * as Notifications from "expo-notifications";

const trackAutomaticEvents = false; //disable legacy mobile autotrack
const useNative = false; //disable Native Mode, use Javascript Mode
// export const mixpanel = new Mixpanel(
//   """,
//   trackAutomaticEvents,
//   useNative
// );
// mixpanel.init();

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

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const { onboardingComplete } = useLogging();

  useEffect(() => {
    SplashScreen.hideAsync();
  });

  return (
    <ThemeProvider value={DefaultTheme}>
      <MenuProvider>
        <SheetProvider context="global">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="workout" />
          </Stack>

          <StatusBar style="auto" />
        </SheetProvider>
      </MenuProvider>
    </ThemeProvider>
  );
}
