// API service for fetching dishes data
// This is a mock implementation. Replace with real API calls as needed.

import { Dish } from "@/types/dish";

const mockDishes: Dish[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    category: 'Pasta',
    description: 'Classic Italian pasta with creamy sauce and pancetta.',
    price: { amount: 12, currency: 'USD' },
    thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    images: [],
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Pepper'],
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    category: 'Pizza',
    description: 'Traditional pizza with tomato, mozzarella, and basil.',
    price: { amount: 10, currency: 'USD' },
    thumbnailUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    images: [],
    ingredients: ['Dough', 'Tomato', 'Mozzarella', 'Basil'],
  },
  // Add more mock dishes as needed
];

export const dishesApi = {
  getAllDishes: async (): Promise<Dish[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDishes;
  },
  getDishById: async (id: string): Promise<Dish | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockDishes.find((dish) => dish.id === id) || null;
  },
};
