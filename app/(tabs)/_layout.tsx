import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-root-toast';

// --- Auth Context ---
const AuthContext = createContext<{ isAuthenticated: boolean; setAuthenticated: (v: boolean) => void }>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Check token on mount and when login changes
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setAuthenticated(!!token);
    };
    checkToken();
    // Listen for login/logout events (optional: use an event emitter for robustness)
    const interval = setInterval(checkToken, 1000); // Poll every second
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- Tab Layout ---
export default function TabLayout() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();
  const redirectedRef = useRef(false);

  // Redirect to profile after login, only from /auth, and only once
  useEffect(() => {
    if (
      isAuthenticated &&
      segments[segments.length - 1] === "auth" &&
      !redirectedRef.current
    ) {
      redirectedRef.current = true;
      router.navigate('/(tabs)/profile');
      Toast.show('Login successful!', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM });
    }
   
    if (!isAuthenticated) {
      redirectedRef.current = false;
    }
  }, [isAuthenticated, segments, router]);

  // Hide tab bar only on /auth when not authenticated
  const hideTabBar = !isAuthenticated && segments[segments.length - 1] === "auth";

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.textSecondary,
        tabBarStyle:
          hideTabBar && route.name === "auth"
            ? { display: 'none' }
            : {
                backgroundColor: Colors.light.background,
                borderTopWidth: 1,
                borderTopColor: Colors.light.border,
                height: 120,
                paddingTop: 8,
              },
        headerStyle: {
          backgroundColor: Colors.light.primary,
        },
        headerTintColor: Colors.light.textWhite,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dishes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarButton: !isAuthenticated ? () => null : undefined,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Panier',
          headerTitle: 'Votre Panier',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarButton: !isAuthenticated ? () => null : undefined,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerTitle: 'Your Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarButton: !isAuthenticated ? () => null : undefined,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="auth"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          title: 'Auth',
          headerTitle: 'Authentication',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="DishDetail"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: Colors.light.textWhite,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}

// Wrap the tab layout with AuthProvider
(TabLayout as any).getLayout = (page: React.ReactNode) => <AuthProvider>{page}</AuthProvider>;
