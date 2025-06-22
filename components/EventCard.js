import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

export default function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.gradientOverlay} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>{event.time} | {event.venue}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  image: { width: "100%", height: 220 },
  gradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  textContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
