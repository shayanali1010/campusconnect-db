// screens/EventDetailScreen.js
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import RegistrationButton from "../components/RegistrationButton";

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params || {};
  const { colors } = useTheme();

  if (!event) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>No event data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {event.image && <Image source={{ uri: event.image }} style={styles.heroImage} />}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{event.title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{event.time} | {event.venue}</Text>
        <Text style={[styles.description, { color: colors.textPrimary }]}>{event.description}</Text>

        <RegistrationButton onPress={() => navigation.navigate("Register", { eventId: event.id, showForm: true })} />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  heroImage: { width: "100%", height: 250 },
  card: { margin: 16, padding: 16, borderRadius: 12, elevation: 4, shadowColor: "#000", shadowOpacity: 0.1 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 4 },
  description: { fontSize: 15, marginTop: 12, lineHeight: 22, marginBottom: 24 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
