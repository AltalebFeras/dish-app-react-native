import { Dish } from "@/types/dish";

const API_BASE_URL = 'https://687ce272918b6422433059ae.mockapi.io/api/v1';

export const dishesApi = {
  async getAllDishes(): Promise<Dish[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dishes`);
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
      }
      return await response.json();
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

