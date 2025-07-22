import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export interface SelectionOption {
  id: string;
  emoji?: string;
  icon?: React.ReactNode;
  label: string;
}

interface SelectionScrollProps {
  options: SelectionOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  style?: any;
}

const SelectionScroll: React.FC<SelectionScrollProps> = ({
  options,
  selectedId,
  onSelect,
  style,
}) => {
  const SIDE_SPACING = 20;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          activeOpacity={0.7}
          style={[
            styles.option,
            { marginRight: index === options.length - 1 ? SIDE_SPACING : 0 },
            { marginLeft: index === 0 ? SIDE_SPACING : 0 },
          ]}
          onPress={() => onSelect(option.id)}
        >
          <View
            style={[
              styles.iconContainer,
              selectedId === option.id && styles.selectedOption,
            ]}
          >
            {option.emoji ? (
              <Text style={styles.emoji}>{option.emoji}</Text>
            ) : (
              option.icon
            )}
          </View>
          <Text style={[styles.label]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  option: {
    alignItems: "center",
    borderRadius: 12,
  },
  selectedOption: {
    borderWidth: 3,
    borderColor: "#614178",
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#F5F5F5",
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2E46",
  },
});

export default SelectionScroll;
