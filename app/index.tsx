import { useEffect } from "react";
import { router } from "expo-router";
import { View } from "react-native";

export default function Home() {
  useEffect(() => {
    // Small delay to ensure router is ready
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <View />;
}
