import { Dish } from "@/types/dish";

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
  }
};

