import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { submitFeedback } from "../data/api";

export default function FeedbackScreen({ route }) {
  const { event } = route.params || {};
  const { colors } = useTheme();

  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async () => {
    if (!feedbackText.trim() || !rating.trim()) {
      Alert.alert("Error", "Please enter feedback and rating.");
      return;
    }

    try {
      await submitFeedback({ eventId: event?.id || null, feedbackText, rating: Number(rating) });
      Alert.alert("Thanks!", "Your feedback has been submitted.");
      setFeedbackText("");
      setRating("");
    } catch (error) {
      Alert.alert("Error", "Could not submit feedback. Try again.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.textPrimary }]}>Your Feedback</Text>

      {event && (
        <Text style={[styles.eventTitle, { color: colors.textSecondary }]}>
          {event.title} @ {event.venue}
        </Text>
      )}

      <TextInput
        placeholder="Write your feedback..."
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.textPrimary }]}
        value={feedbackText}
        onChangeText={setFeedbackText}
        multiline
      />

      <TextInput
        placeholder="Rating (1-5)"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.textPrimary }]}
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.accent }]} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  eventTitle: { fontSize: 16, marginBottom: 16 },
  input: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
