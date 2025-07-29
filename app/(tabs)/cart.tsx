import { useCartContext } from "@/providers/CartProvider";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, clearCart, total, createOrder } = useCartContext();

  const handleCreateOrder = async () => {
    await createOrder();
    // Cart and dish cards will update automatically
  };

  if (items.length === 0)
    return (
      <View style={styles.centered}>
        <Text>Votre panier est vide.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.dish.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.dish.name}</Text>
            <Text style={styles.itemQty}>x{item.quantity}</Text>
            <Text style={styles.itemPrice}>
              {item.dish.price.amount * item.quantity} {item.dish.price.currency}
            </Text>
            <TouchableOpacity onPress={() => removeFromCart(item.dish.id)}>
              <Text style={styles.remove}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: {total} €</Text>
      <TouchableOpacity style={styles.orderButton} onPress={handleCreateOrder}>
        <Text style={styles.orderButtonText}>Créer la commande</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
  },
  itemName: { flex: 2, fontSize: 16 },
  itemQty: { flex: 1, fontSize: 16, textAlign: "center" },
  itemPrice: { flex: 1, fontSize: 16, textAlign: "right" },
  remove: { color: "red", marginLeft: 12 },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 16, textAlign: "right" },
  orderButton: {
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  orderButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
