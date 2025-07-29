import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuthContext } from "../app/(tabs)/_layout"; // Import the context
import * as authService from "../services/authService";

// Helper to get token from AsyncStorage
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setAuthenticated } = useAuthContext();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      setIsAuthenticated(true);
      setAuthenticated(true);
      router.navigate("/(tabs)/profile"); // Redirect to profile after login
    } catch (e: any) {
      if (e?.message) {
        setError(e.message);
      } else if (typeof e === "string") {
        setError(e);
      } else {
        setError("Invalid credentials or server error.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.register(email, password, confirmPassword, firstName, lastName);
      // Registration successful, redirect to login
      setScreen("login");
      setError(null);
    } catch (e: any) {
      // Try to extract all error messages
      if (e?.message) {
        setError(e.message);
      } else if (typeof e === "string") {
        setError(e);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Reset", "Password reset link sent (mock).");
  };

  // Expose error and navigation helpers
  return {
    isAuthenticated,
    screen,
    setScreen,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleForgotPassword,
  };
}