import { Colors } from "@/constants/Colors";
import { dishesApi } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function MyRestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dishesApi.fetchMyRestaurants();
        setRestaurants(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load your restaurants");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Loading your restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.label}>Members:</Text>
            {Array.isArray(item.members) && item.members.length > 0 ? (
              item.members.map((member: any, idx: number) => (
                <Text key={idx} style={styles.member}>
                  {member.role}: {member.user_name} ({member.user_email})
                </Text>
              ))
            ) : (
              <Text style={styles.member}>No members listed.</Text>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No restaurants found.</Text>}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  title: { fontWeight: "bold", fontSize: 18 },
  address: { color: "#666", marginTop: 4 },
  description: { color: "#888", marginTop: 2 },
  label: { marginTop: 8, fontWeight: "bold" },
  member: { color: "#444", marginLeft: 8, marginTop: 2 },
  listContainer: { paddingBottom: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: Colors.light.textSecondary },
  error: { fontSize: 16, color: Colors.light.error, textAlign: "center" },
  emptyText: { textAlign: "center", color: Colors.light.textSecondary, fontSize: 16, marginTop: 32 },
});
