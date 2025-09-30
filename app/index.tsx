import { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { View } from "react-native";
import { useLogging } from "@/data/logging";

export default function Home() {
  const { onboardingComplete } = useLogging();

  if (onboardingComplete) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/onboarding/welcome" />;
  }
}
