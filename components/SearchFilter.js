import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SearchFilter({ value, onChangeText }) {
  const { colors } = useTheme();

  return (
    <TextInput
      placeholder="Search events..."
      placeholderTextColor={colors.textSecondary}
      style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.textPrimary }]}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginTop:9,
    fontSize: 16,
  },
});
