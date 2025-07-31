import { AuthProvider } from '@/context/AuthContext';
import { Stack } from "expo-router";
import { View } from "react-native";
import { RootSiblingParent } from 'react-native-root-siblings';
import { CartProvider } from "../providers/CartProvider";


export default function RootLayout() {
  return (
    <RootSiblingParent>
      <AuthProvider>
      <CartProvider>  
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="DishDetail"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#2e7d32",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          presentation: "modal",
        }}
      />
    </Stack>
      </CartProvider>
      </AuthProvider>
  </RootSiblingParent>

  );
}

<View style={{ pointerEvents: 'none' }}>
  {/* Other components */}
</View>
