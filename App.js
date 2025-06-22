// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import MainTabs from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
