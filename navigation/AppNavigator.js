// navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailScreen from "../screens/EventDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* HomeMain — headerShown false */}
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* EventDetail — header shown with just title */}
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: "Event Detail" }}
      />
    </Stack.Navigator>
  );
}
