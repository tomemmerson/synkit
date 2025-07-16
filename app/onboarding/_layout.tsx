import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="onboardingGoals"
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerTransparent: true,
          headerBlurEffect: "light",
        }}
      />
      <Stack.Screen
        name="onboardingMendbot"
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerBlurEffect: "light",
        }}
      />
    </Stack>
  );
}
