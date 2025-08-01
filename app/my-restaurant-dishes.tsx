import ScreenLayout from "@/components/ScreenLayout";
import { Colors } from "@/constants/Colors";
import { dishesApi } from "@/services/api";
import { Dish } from "@/types/dish";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function MyRestaurantDishesScreen() {
  const { restaurantId, restaurantName } = useLocalSearchParams<{
    restaurantId: string;
    restaurantName: string;
  }>();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const data = await dishesApi.fetchRestaurantDishes(restaurantId);
        setDishes(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Impossible de charger les plats");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDishes();
  }, [restaurantId]);

  const renderDishItem = ({ item }: { item: Dish }) => (
    <View style={styles.dishCard}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.dishImage} />
      <View style={styles.dishInfo}>
        <Text style={styles.dishTitle}>{item.name}</Text>
        <Text style={styles.dishCategory}>{item.category}</Text>
        <Text style={styles.dishDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.dishPrice}>
          {item.price.amount} {item.price.currency}
        </Text>
        {item.ingredients && item.ingredients.length > 0 && (
          <Text style={styles.ingredients}>
            Ingrédients: {item.ingredients.join(", ")}
          </Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <ScreenLayout title="Chargement..." showBackButton>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>Chargement des plats...</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout title="Erreur" showBackButton>
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout 
      title={`Plats - ${restaurantName || `Restaurant ${restaurantId}`}`} 
      showBackButton
      scrollable={false}
    >
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDishItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun plat trouvé pour ce restaurant.</Text>
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  error: {
    fontSize: 16,
    color: Colors.light.error,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  retryButtonText: {
    color: Colors.light.textWhite,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 16,
  },
  dishCard: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  dishInfo: {
    flex: 1,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 4,
  },
  dishCategory: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontStyle: "italic",
  },
  emptyText: {
    textAlign: "center",
    color: Colors.light.textSecondary,
    fontSize: 16,
    marginTop: 32,
  },
});
