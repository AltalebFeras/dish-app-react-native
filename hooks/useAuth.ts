import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { login, register } from "../services/authService";

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

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await register(email, password, confirmPassword, firstName, lastName);
      setScreen("login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    setError(null);
    // Implement forgot password logic here if needed
    setTimeout(() => {
      setIsLoading(false);
      setScreen("login");
    }, 1000);
  };

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