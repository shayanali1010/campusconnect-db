import React, { createContext, useContext, useState } from "react";

const lightColors = {
  background: "#ffffff",
  headerBackground: "#0c0a33",  // 👈 Header/Footer color for light theme
  headerText: "#ffffff",
  cardBackground: "#ffffff",
  textPrimary: "#000000",
  textSecondary: "#555555",
  accent: "#34abeb",           // 👈 Active icon color
};

const darkColors = {
  background: "#121212",
  headerBackground: "#0c0a33",  // 👈 Header/Footer color for dark theme
  headerText: "#ffffff",
  cardBackground: "#1f1f1f",
  textPrimary: "#ffffff",
  textSecondary: "#bbbbbb",
  accent: "#34abeb",           // 👈 Active icon color
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark"); // Default dark mode
  const colors = theme === "dark" ? darkColors : lightColors;

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
