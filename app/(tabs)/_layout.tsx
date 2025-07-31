import { Colors } from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// --- Tab Layout ---
export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.textSecondary,
        tabBarStyle: {
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
      {/* {!isAuthenticated && ( */}
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
      {/* )} */}
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
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Commandes',
          headerTitle: 'Mes Commandes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarButton: !isAuthenticated ? () => null : undefined,
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          title: 'Restaurants',
          headerTitle: 'Nos Restaurants',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
          tabBarButton: !isAuthenticated ? () => null : undefined,
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
