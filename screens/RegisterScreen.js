// screens/RegisterScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ route }) {
  const { eventId = "global", showForm = false } = route?.params || {};
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [showQR, setShowQR] = useState(!showForm); // show QR if form is false
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function loadRegistrations() {
    try {
      const data = await AsyncStorage.getItem(`registrations_${eventId}`);
      if (data) setRegistrations(JSON.parse(data));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRegister() {
    if (!name || !email) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    try {
      const newRegistration = { id: Date.now().toString(), eventId, name, email };
      const updated = [...registrations, newRegistration];
      await AsyncStorage.setItem(`registrations_${eventId}`, JSON.stringify(updated));
      setRegistrations(updated);     // also update local list
      setName("");
      setEmail("");
      Alert.alert("Success", "You are now registered!");
      setShowQR(true);               // show QR after registering
    } catch (error) {
      Alert.alert("Error", "Error saving registration.");
    }
  }

  async function handleDelete(id) {
    try {
      const filtered = registrations.filter((item) => item.id !== id);
      await AsyncStorage.setItem(`registrations_${eventId}`, JSON.stringify(filtered));
      setRegistrations(filtered);     // update local list
    } catch (error) {
      Alert.alert("Error", "Error deleting registration.");
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {showForm && (
        <>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Your Name:</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.textSecondary, color: colors.textPrimary }]}
            value={name}
            placeholder="Your name"
            placeholderTextColor={colors.textSecondary}
            onChangeText={setName}
          />

          <Text style={[styles.label, { color: colors.textPrimary }]}>Your Email:</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.textSecondary, color: colors.textPrimary }]}
            value={email}
            placeholder="Your email"
            placeholderTextColor={colors.textSecondary}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.accent }]}
            onPress={handleRegister}
          >
            <Text style={{ color: "#fff" }}>Register</Text>
          </TouchableOpacity>
        </>
      )}

      {/* QR Code Section */}
      {showQR && registrations.length > 0 && (
        <View style={{ alignItems: "center", marginVertical: 24 }}>
          <QRCode value={JSON.stringify(registrations)} size={200} backgroundColor="white" />

          <TouchableOpacity style={styles.copyButton} onPress={() => setCopied(true)}>
            <Text style={{ color: colors.accent }}>{copied ? "Copied!" : "Copy QR Data"}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Generate QR Button */}
      {!showQR && registrations.length > 0 && (
        <TouchableOpacity
          style={[styles.qrButton, { backgroundColor: colors.accent }]}
          onPress={() => setShowQR(true)}
        >
          <Text style={{ color: "#fff" }}>Click here to generate QR code</Text>
        </TouchableOpacity>
      )}

      {/* Registrations list */}
      <Text style={[styles.subtitle, { color: colors.textPrimary }]}>Your Registrations:</Text>
      <FlatList
        data={registrations}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ color: colors.textSecondary }}>No registrations yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.registrationItem}>
            <Text style={{ color: colors.textPrimary }}>{item.name} ({item.email})</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  registerButton: { padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 24 },
  qrButton: { padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 24 },
  copyButton: { marginTop: 12 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 16 },
  registrationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
