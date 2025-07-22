import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
  icon?: {
    icon: IconProp;
    color: string;
    size?: number;
  };
  label: string;
}

interface SelectionScrollProps {
  options: SelectionOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  style?: any;
  title?: string;
}

const SelectionScroll: React.FC<SelectionScrollProps> = ({
  options,
  selectedId,
  onSelect,
  title,
  style,
}) => {
  const SIDE_SPACING = 20;
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
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
                <FontAwesomeIcon
                  icon={option.icon?.icon || faXmark}
                  color={option.icon?.color || "#000"}
                  size={option.icon?.size || 38}
                />
              )}
            </View>
            <Text style={[styles.label]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5F2E71",
    marginBottom: 20,
    marginHorizontal: 24,
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.11)",
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
