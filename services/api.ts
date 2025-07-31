import { Dish } from "@/types/dish";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'https://simplats-backend-main-854o9w.laravel.cloud/api';

export const dishesApi = {
  async getAllDishes(): Promise<Dish[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dishes`);
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
      }
      const json = await response.json();
      // The actual dishes are in json.data
      return json.data;
    } catch (error) {
      console.error('Error fetching dishes:', error);
      throw error;
    }
  },

  async getDishById(id: string): Promise<Dish> {
    try {
      const response = await fetch(`${API_BASE_URL}/dishes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dish');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching dish:', error);
      throw error;
    }
  },

  async fetchRestaurants() {
    const token = await AsyncStorage.getItem("token");
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE_URL}/restaurants`, { headers });
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return await res.json();
  },

  async fetchRestaurantDetail(id: number | string) {
    const token = await AsyncStorage.getItem("token");
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE_URL}/restaurants/${id}`, { headers });
    if (!res.ok) throw new Error("Failed to fetch restaurant detail");
    return await res.json();
  }
};

