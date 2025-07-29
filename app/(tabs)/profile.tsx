import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  restaurants: any[];
  orders: any[];
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let didCancel = false;
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem("token");
        const tokenType = (await AsyncStorage.getItem("token_type")) || "Bearer";
        console.log("Token:", token, "TokenType:", tokenType); // Debug log
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }
        // Add a timeout to the fetch
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000); // 7 seconds

        const res = await fetch("https://simplats-backend-main-854o9w.laravel.cloud/api/auth/me", {
          headers: {
            "Authorization": `${tokenType} ${token}`,
            "Accept": "application/json",
          },
          signal: controller.signal,
        }).catch((err) => {
          if (err.name === "AbortError") {
            throw new Error("Request timed out.");
          }
          throw err;
        });
        clearTimeout(timeout);

        if (!res || !res.ok) {
          setError("Failed to fetch profile.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (!didCancel) setProfile(data);
      } catch (err: any) {
        setError(err?.message || "An error occurred while fetching profile.");
      } finally {
        if (!didCancel) setLoading(false);
      }
    };
    fetchProfile();
    return () => { didCancel = true; };
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error || "No profile data."}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="person-circle-outline" size={64} color="#ccc" />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>ID: <Text style={styles.value}>{profile.id}</Text></Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{profile.name}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{profile.email}</Text></Text>
      <Text style={styles.label}>Created At: <Text style={styles.value}>{profile.created_at}</Text></Text>
      <Text style={styles.label}>Updated At: <Text style={styles.value}>{profile.updated_at}</Text></Text>
      <Text style={styles.label}>Restaurants: <Text style={styles.value}>{profile.restaurants.length}</Text></Text>
      <Text style={styles.label}>Orders: <Text style={styles.value}>{profile.orders.length}</Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({  
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#2e7d32",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  value: {
    fontWeight: "normal",
    color: "#333",
  },
});
