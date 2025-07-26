import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { getAllTasks } from "../services/taskService";

export default function TaskScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTasks();
        setTasks(data);
      } catch (e: any) {
        // Show API error message if present
        if (e?.message) setError(e.message);
        else setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text>Loading tasks...</Text>
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