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


const API_BASE_URL_TASKS = 'https://127.0.0.1:8000/api';

export const tasksApi = {
  async getAllTasks() {
    try {
      const response = await fetch(`${API_BASE_URL_TASKS}/tasks`);
      const json = await response.json();
      if (json.success) {
        return json.data;
      } else {
        throw new Error(json.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
};
