import { Colors } from '@/constants/Colors';
import { dishesApi } from '@/services/api';
import { Dish } from '@/types/dish';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function DishDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDish = async () => {
      if (!id) {
        setError('Aucun ID de plat fourni');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const dishData = await dishesApi.getDishById(id);
        setDish(dishData);
      } catch (err) {
        setError('Impossible de charger les détails du plat');
        console.error('Error fetching dish:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Chargement des détails du plat...</Text>
      </View>
    );
  }

  if (error || !dish) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Plat non trouvé'}</Text>
      </View>
    );
  }

  // Handle thumbnailUrl - use first image if thumbnailUrl is null
  const displayImage = dish.thumbnailUrl || (dish.images && dish.images.length > 0 ? dish.images[0] : null);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: dish?.name || 'Détails du Plat',
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: Colors.light.textWhite,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginLeft: 8 }}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.light.textWhite} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container}>

        {displayImage && (
          <Image
            source={{ uri: displayImage }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{dish.name}</Text>
          <Text style={styles.category}>{dish.category}</Text>
          <Text style={styles.price}>
            {dish.price && dish.price.amount != null && dish.price.currency
              ? `${dish.price.amount} ${dish.price.currency}`
              : "Prix non disponible"}
          </Text>
          
          <Text style={styles.description}>{dish.description}</Text>
          
          <Text style={styles.sectionTitle}>Ingrédients :</Text>
          {Array.isArray(dish.ingredients) && dish.ingredients.length > 0 ? (
            dish.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                • {ingredient}
              </Text>
            ))
          ) : (
            <Text style={styles.ingredient}>Aucun ingrédient listé.</Text>
          )}
          
          {Array.isArray(dish.images) && dish.images.length > 1 && (
            <>
              <Text style={styles.sectionTitle}>Plus d'images :</Text>
              {dish.images.slice(1).map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.additionalImage}
                  resizeMode="cover"
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.light.text,
  },
  category: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: Colors.light.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: Colors.light.text,
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 10,
    color: Colors.light.textSecondary,
  },
  additionalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  error: {
    fontSize: 16,
    color: Colors.light.error,
    textAlign: 'center',
  },
  backButtonContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 20,
  },
  backButtonText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
});
