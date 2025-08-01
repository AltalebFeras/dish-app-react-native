import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ScreenLayoutProps {
  title: string;
  showBackButton?: boolean;
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function ScreenLayout({ 
  title, 
  showBackButton = false, 
  children, 
  scrollable = true 
}: ScreenLayoutProps) {
  const router = useRouter();

  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable 
    ? { contentContainerStyle: styles.scrollContent }
    : { style: styles.content };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.light.textWhite} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
      
      {/* Content */}
      <Container {...containerProps}>
        {children}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    minHeight: 80,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: Colors.light.textWhite,
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    padding: 16,
  },
});
