import React from "react";
import {
  NativeTabs,
  Icon,
  Label,
  Badge,
} from "expo-router/unstable-native-tabs";
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
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon
            sf={{ default: "house", selected: "house.fill" }}
            selectedColor={"#614178"}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="fitness">
          <Label>Fitness</Label>
          <Icon
            sf={{ default: "dumbbell", selected: "dumbbell.fill" }}
            selectedColor={"#614178"}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Label>Settings</Label>
          <Icon sf={"ellipsis"} selectedColor={"#614178"} />
        </NativeTabs.Trigger>
      </NativeTabs>
    </SheetProvider>
  );
}
