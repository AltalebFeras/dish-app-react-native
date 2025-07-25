import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { dishesApi } from '../services/api';
import { Dish } from '../types/dish';
import { Colors } from '@/constants/Colors';

export default function DishDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDish = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const dishData = await dishesApi.getDishById(id);
        setDish(dishData);
      } catch (err) {
        setError('Failed to load dish details');
        console.error(err);
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
        <Text>Loading dish details...</Text>
      </View>
    );
  }

  if (error || !dish) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Dish not found'}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: dish?.name || 'Dish Details',
          headerStyle: {
            backgroundColor: '#2e7d32',
          },
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: dish.thumbnailUrl }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{dish.name}</Text>
          <Text style={styles.category}>{dish.category}</Text>
          <Text style={styles.price}>
            {dish.price.amount} {dish.price.currency}
          </Text>
          
          <Text style={styles.description}>{dish.description}</Text>
          
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {dish.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              • {ingredient}
            </Text>
          ))}
          
          {dish.images.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>More Images:</Text>
              {dish.images.map((imageUrl, index) => (
                <Image 
                  key={index} 
                  source={{ uri: imageUrl }} 
                  style={styles.additionalImage} 
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
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 10,
  },
  additionalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
