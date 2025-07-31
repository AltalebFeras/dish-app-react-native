import { Colors } from "@/constants/Colors";
import { dishesApi } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

function AddDishForm({ restaurantId, onSuccess, onClose }: { restaurantId: number, onSuccess: (msg: string) => void, onClose: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [ingredients, setIngredients] = useState<string>(""); // comma separated
  const [images, setImages] = useState<string>(""); // comma separated
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setApiMessage(null);
    try {
      const payload = {
        name,
        category,
        description,
        thumbnailUrl,
        price: {
          amount: parseFloat(amount),
          currency,
        },
        ingredients: ingredients.split(",").map((i) => i.trim()).filter(Boolean),
        images: images.split(",").map((i) => i.trim()).filter(Boolean),
      };
      const res = await dishesApi.addDishToRestaurant(restaurantId, payload);
      setApiMessage(res.message || "Dish added successfully!");
      onSuccess(res.message || "Dish added successfully!");
    } catch (err: any) {
      setApiMessage(err.message || "Failed to add dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <Text style={styles.formTitle}>Add Dish</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Thumbnail URL" value={thumbnailUrl} onChangeText={setThumbnailUrl} />
      <TextInput style={styles.input} placeholder="Price (amount)" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Currency" value={currency} onChangeText={setCurrency} />
      <TextInput style={styles.input} placeholder="Ingredients (comma separated)" value={ingredients} onChangeText={setIngredients} />
      <TextInput style={styles.input} placeholder="Images (comma separated URLs)" value={images} onChangeText={setImages} />
      {apiMessage && <Text style={styles.apiMessage}>{apiMessage}</Text>}
      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.submitButtonText}>{loading ? "Adding..." : "Add Dish"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default function MyRestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const router = useRouter();

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

  const handleAddDish = (restaurantId: number) => {
    setSelectedRestaurantId(restaurantId);
    setShowForm(true);
    setApiMessage(null);
  };

  const handleFormSuccess = (msg: string) => {
    setApiMessage(msg);
    setShowForm(false);
  };

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
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>My Restaurants</Text>
      {apiMessage && <Text style={styles.apiMessage}>{apiMessage}</Text>}
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
            <TouchableOpacity
              style={styles.addDishButton}
              onPress={() => handleAddDish(item.id)}
            >
              <Text style={styles.addDishButtonText}>Add Dish</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No restaurants found.</Text>}
        contentContainerStyle={styles.listContainer}
      />
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedRestaurantId && (
              <AddDishForm
                restaurantId={selectedRestaurantId}
                onSuccess={handleFormSuccess}
                onClose={() => setShowForm(false)}
              />
            )}
          </View>
        </View>
      </Modal>
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
  addDishButton: {
    marginTop: 12,
    backgroundColor: Colors.light.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addDishButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    maxHeight: "90%",
  },
  formContainer: {
    padding: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: Colors.light.backgroundDark,
  },
  submitButton: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  apiMessage: {
    color: Colors.light.primary,
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "bold",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 6,
  },
  backButtonText: {
    color: Colors.light.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
