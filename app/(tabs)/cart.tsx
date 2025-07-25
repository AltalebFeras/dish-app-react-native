import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";

export default function Cart() {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={64} color="#ccc" />
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.subtitle}>
        Your cart is currently empty. Start adding dishes to your cart!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
