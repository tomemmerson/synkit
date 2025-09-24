import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ActionSheet, {
  SheetManager,
  ActionSheetRef,
} from "react-native-actions-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

type Props = {
  children?: React.ReactNode;
  title?: string;
  buttonName?: string;
  onSelect?: () => void;
};

function BaseSheet({ children, onSelect, title, buttonName }: Props) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      containerStyle={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      snapPoints={[99]} // Add consistent snap points
      initialSnapIndex={0}
    >
      <View style={styles.container}>
        <View style={[styles.header, styles.outerMargin]}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.closeButton}
            onPress={() => actionSheetRef.current?.hide()}
          >
            <FontAwesomeIcon icon={faXmark} size={20} color="#5F2E71" />
          </TouchableOpacity>
        </View>

        {children}
        <TouchableOpacity
          style={[styles.logButton, styles.outerMargin]}
          onPress={onSelect}
        >
          <Text style={styles.logButtonText}>{buttonName}</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  outerMargin: {
    marginHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5F2E71",
  },
  closeButton: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  moodContainer: {
    marginBottom: 40,
  },
  logButton: {
    backgroundColor: "#614178",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },
  logButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BaseSheet;
