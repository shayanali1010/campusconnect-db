import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 18 }}>{theme === "dark" ? "🌙" : "🌞"}</Text>
    </TouchableOpacity>
  );
}
