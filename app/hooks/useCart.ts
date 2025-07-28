import { CartItem, Dish } from "@/types/dish";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";

const CART_KEY = "cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from AsyncStorage on mount (async/await for reliability)
  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await AsyncStorage.getItem(CART_KEY);
        if (data) {
          setItems(JSON.parse(data));
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoaded(true);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  const addToCart = (dish: Dish, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      } else {
        updated = [...prev, { dish, quantity }];
      }
      return updated;
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.dish.id !== dishId);
      Toast.show("Plat supprimé du panier", { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) } : item
      );
      return updated;
    });
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
