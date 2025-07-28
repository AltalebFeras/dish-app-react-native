import { CartItem, Dish } from "@/types/dish";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";

const CART_KEY = "cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(CART_KEY).then((data) => {
      if (data) setItems(JSON.parse(data));
    });
  }, []);

  // Save cart to AsyncStorage whenever items change
  useEffect(() => {
    AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (dish: Dish, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dish, quantity }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
    Toast.show("Plat supprimé du panier", { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
  };

  const clearCart = () => setItems([]);

  const updateQuantity = (dishId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.dish.price.amount * item.quantity,
    0
  );

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    total,
  };
}
