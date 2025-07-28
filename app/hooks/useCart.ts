import { CartItem, Dish } from "@/types/dish";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";

const CART_KEY = "cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from AsyncStorage on mount
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

  // Save cart to AsyncStorage whenever items change, but only after initial load
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
            ? { ...item, quantity: Math.min(10, quantity) }
            : item
        );
      } else {
        updated = [...prev, { dish, quantity }];
      }
      // Always return a new array reference
      return [...updated];
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.dish.id !== dishId);
      Toast.show("Plat supprimé du panier", { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
      // Always return a new array reference
      return [...updated];
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
      // Always return a new array reference
      return [...updated];
    });
  };

  // Helper to get quantity of a dish in cart
  const getQuantity = (dishId: string) => {
    const item = items.find(i => i.dish.id === dishId);
    return item ? item.quantity : 0;
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
    getQuantity,
    total,
  };
}
