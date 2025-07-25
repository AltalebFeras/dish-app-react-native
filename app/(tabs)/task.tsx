import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { tasksApi } from '../services/api';

type Task = {
  title: string;
  description: string;
  deadline: string;
  is_deleted: boolean;
  categories: { name: string }[];
  created_at: string;
  updated_at: string;
  status: { name: string };
  user: any;
};

const TaskScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    tasksApi.getAllTasks()
      .then(setTasks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16, padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status?.name}</Text>
            <Text>Deadline: {item.deadline}</Text>
            <Text>Categories: {item.categories?.map((c: any) => c.name).join(', ')}</Text>
            <Text>Deleted: {item.is_deleted ? 'Yes' : 'No'}</Text>
            <Text>Created: {item.created_at}</Text>
            <Text>Updated: {item.updated_at}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskScreen;