import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert } from "react-native";
import * as authService from "../services/authService";

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

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      setIsAuthenticated(true);
      if (data.token) {
        await SecureStore.setItemAsync("token", data.token);
      }
      // Navigate to Task screen (assuming route is '/task')
      router.replace("/task");
    } catch (e: any) {
      setError(e?.message || "Invalid credentials or server error.");
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
      await authService.register(email, password, confirmPassword, firstName, lastName);
      // Registration successful, redirect to login
      setScreen("login");
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Registration failed.");
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
