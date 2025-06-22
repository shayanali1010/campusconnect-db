import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getFeed } from "../data/api";

export default function FeedScreen() {
  const { colors } = useTheme();
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        const data = await getFeed();
        setFeedItems(data);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFeed();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>Loading feed...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={feedItems}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
          <Text style={{ color: colors.textSecondary }}>{item.description}</Text>
          <Text style={{ color: colors.textSecondary }}>{item.date}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={{ color: colors.textPrimary }}>No feed items found.</Text>
        </View>
      }
    />
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  content: { padding: 16 },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
