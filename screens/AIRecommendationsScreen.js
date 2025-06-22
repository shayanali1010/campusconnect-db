// screens/AIRecommendationsScreen.js
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getRecommendations } from "../data/api";

export default function AIRecommendationsScreen({ navigation }) {
  const { colors } = useTheme();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const data = await getRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>Loading recommendations...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recommendations}
      keyExtractor={(item) => item.id}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={{ color: colors.textPrimary }}>No recommendations found.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.cardBackground }]}
          onPress={() => {
            // 👇 Bas yaha yeh change kiya hay
            navigation.navigate('Home', {
              screen: 'EventDetail',
              params: { event: item },
            });
          }}
          activeOpacity={0.9}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  content: { padding: 16 },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: "100%", height: 180, borderRadius: 10, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, marginTop: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
