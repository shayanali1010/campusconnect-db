// navigation/BottomTabNavigator.js
import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

import AppNavigator from "./AppNavigator"; 
import FeedScreen from "../screens/FeedScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import AIRecommendationsScreen from "../screens/AIRecommendationsScreen";

// 🎯 Header Left Icon
function HeaderLeftIcon() {
  const { colors } = useTheme();
  return (
    <Ionicons
      name="school"
      size={24}
      color={colors.headerText}
      style={{ paddingHorizontal: 16 }}
    />
  );
}

// 🎯 Header Title (center)
function HeaderTitle() {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        color: colors.headerText,
        fontSize: 16,
        fontWeight: "500",
      }}
    >
      CampusConnect+
    </Text>
  );
}

// 🎯 Header Right Toggle
function ThemeToggleButton() {
  const { theme, toggleTheme, colors } = useTheme();
  return (
    <Ionicons
      name={theme === "light" ? "moon" : "sunny"}
      size={24}
      color={colors.headerText}
      onPress={toggleTheme}
      style={{ paddingHorizontal: 16 }}
    />
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: HeaderTitle,
        headerTitleAlign: "center",
        headerLeft: HeaderLeftIcon,
        headerRight: ThemeToggleButton,
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.headerText,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.headerBackground },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Feed":
              iconName = "newspaper";
              break;
            case "Register":
              iconName = "person-add";
              break;
            case "Feedback":
              iconName = "chatbubbles";
              break;
            case "Recommendations":
              iconName = "sparkles";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={AppNavigator} options={{ title: "Home" }} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{ title: "Event Feed" }} />
      <Tab.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
      <Tab.Screen name="Feedback" component={FeedbackScreen} options={{ title: "Feedback" }} />
      <Tab.Screen name="Recommendations" component={AIRecommendationsScreen} options={{ title: "Recommendations" }} />
    </Tab.Navigator>
  );
}
