import { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { View } from "react-native";

export default function Home() {
  return <Redirect href="/onboarding/welcome" />;
}
