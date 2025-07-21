import { Stack, Tabs } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="journey"
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="workout"
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="pick-workout"
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
