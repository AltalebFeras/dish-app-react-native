import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';
import { CartProvider } from "../providers/CartProvider";


export default function RootLayout() {
  return (
    <RootSiblingParent>
      <CartProvider>  
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="dish-detail"
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
  </RootSiblingParent>

  );
}
