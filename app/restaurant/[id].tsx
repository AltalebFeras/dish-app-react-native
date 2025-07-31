import { Colors } from "@/constants/Colors";
import { dishesApi } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await dishesApi.fetchRestaurantDetail(id);
        setRestaurant(data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Loading restaurant...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  if (!restaurant)
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Restaurant not found.</Text>
      </View>
    );

  const dishes = restaurant.dishes || [];
  const categories = Array.from(new Set(dishes.map((dish: any) => dish.category)));

  const filteredDishes = dishes.filter((dish: any) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dish.category && dish.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? dish.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const renderDishItem = ({ item }: { item: any }) => (
    <View style={styles.dishCard}>
      <Text style={styles.dishTitle}>{item.name}</Text>
      <Text style={styles.dishCategory}>{item.category}</Text>
      <Text style={styles.dishDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.layoutContainer}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.textWhite} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {restaurant.name}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.address}>{restaurant.address}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search dishes or categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          <TouchableOpacity
            style={[styles.categoryButton, !selectedCategory && styles.categoryButtonSelected]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.categoryText, !selectedCategory && styles.categoryTextSelected]}>All</Text>
          </TouchableOpacity>
          {categories.map((category) => {
            const cat = typeof category === "string" ? category : String(category ?? "Other");
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryButtonSelected,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Dishes:</Text>
        <FlatList
          data={filteredDishes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDishItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No dishes found.</Text>}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    minHeight: 80,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: Colors.light.textWhite,
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  address: {
    color: "#666",
    marginTop: 4,
  },
  description: {
    color: "#888",
    marginTop: 2,
    marginBottom: 12,
  },
  searchBar: {
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.backgroundDark,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
  },
  categoryScroll: {
    minHeight: 48,
    maxHeight: 48,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  categoryTextSelected: {
    color: Colors.light.textWhite,
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  dishCard: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  dishTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dishCategory: {
    color: "#666",
    marginTop: 2,
  },
  dishDescription: {
    color: "#888",
    marginTop: 2,
  },
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
  },
  emptyText: {
    textAlign: "center",
    color: Colors.light.textSecondary,
    fontSize: 16,
    marginTop: 32,
  },
});
