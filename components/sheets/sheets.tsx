import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import MoodSheet from "./Mood";
import PeriodSheet from "./Period";
import ChangePlanSheet from "./ChangePlan";

registerSheet("mood-sheet", MoodSheet);
registerSheet("period-sheet", PeriodSheet);
registerSheet("change-plan-sheet", ChangePlanSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "mood-sheet": SheetDefinition<{
      payload: {
        selectedDate: Date;
      };
    }>;
    "period-sheet": SheetDefinition<{
      payload: {
        selectedDate: Date;
      };
    }>;
    "change-plan-sheet": SheetDefinition<{
      payload: {};
    }>;
  }
}

export {};
