import React from "react";
import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faDumbbell,
  faUtensils,
} from "@fortawesome/pro-light-svg-icons";
import { faEllipsis } from "@fortawesome/pro-solid-svg-icons";
import { SheetProvider } from "react-native-actions-sheet";
import "@/components/sheets/sheets";

export default function TabLayout() {
  return (
    <SheetProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#614178",
          tabBarInactiveTintColor: "#9294AC",
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHome} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fitness"
          options={{
            title: "Fitness",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faDumbbell} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faEllipsis} size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SheetProvider>
  );
}
