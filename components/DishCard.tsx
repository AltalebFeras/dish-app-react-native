import { useCartContext } from "@/providers/CartProvider";
import { Dish } from "@/types/dish";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";

type Props = {
  dish: Dish;
};

export default function DishCard({ dish }: Props) {
  const { addToCart, getQuantity } = useCartContext();
  // Use cart quantity as initial value
  const cartQuantity = getQuantity(dish.id);
  const [quantity, setQuantity] = useState(cartQuantity || 1);

  // Sync local quantity with cart quantity if cart changes
  useEffect(() => {
    setQuantity(cartQuantity || 1);
  }, [cartQuantity]);

  const handleMinus = () => setQuantity(q => Math.max(1, q - 1));
  const handlePlus = () => setQuantity(q => Math.min(10, q + 1));

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    Toast.show("Plat ajouté au panier", { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
    // No need to reset quantity, keep it in sync with cart
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: dish.thumbnailUrl }} style={styles.image} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.category}>{dish.category}</Text>
      <Text style={styles.price}>
        {dish.price.amount} {dish.price.currency}
      </Text>
      <View style={styles.qtyRow}>
        <TouchableOpacity style={styles.qtyBtn} onPress={handleMinus}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={handlePlus}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddToCart}
      >
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </TouchableOpacity>
      <Text style={{textAlign: "center", color: "#2e7d32", marginTop: 4}}>
        Dans le panier : {cartQuantity}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    gap: 8,
  },
  qtyBtn: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
