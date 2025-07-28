import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';


export default function RootLayout() {
  return (
    <RootSiblingParent> 
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
  </RootSiblingParent>

  );
}
