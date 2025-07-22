import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import MoodSheet from "./Mood";

registerSheet("mood-sheet", MoodSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "mood-sheet": SheetDefinition;
  }
}

export {};
