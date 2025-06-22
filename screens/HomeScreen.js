import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getEvents } from "../data/api";
import { filterEvents } from "../utils/filters";
import EventCard from "../components/EventCard";
import SearchFilter from "../components/SearchFilter";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => setEvents(await getEvents()))();
  }, []);

  const filteredData = filterEvents(events, searchText);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🔍 Search */}
      <SearchFilter value={searchText} onChangeText={setSearchText} />

      {/* 📜 Event list */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate("EventDetail", { event: item })} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 16 },
});
