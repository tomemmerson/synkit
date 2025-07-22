import { Text } from "react-native";
import { View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

function MoodSheet() {
  return (
    <ActionSheet snapPoints={[100]} gestureEnabled>
      <View>
        <Text>Hello World</Text>
      </View>
    </ActionSheet>
  );
}

export default MoodSheet;
