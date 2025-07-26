import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { getToken } from "../hooks/useAuth"; // add this import
import { getAllTasks } from "../services/taskService";

export default function TaskScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      setLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (e: any) {
        if (e?.message) setError(e.message);
        else setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndFetch();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text>Loading tasks...</Text>
      </View>
    );

  if (isAuthenticated === false)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          You are not logged in. Please login to view your tasks.
        </Text>
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </View>
    );
  if (!tasks || tasks.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No tasks found.</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}