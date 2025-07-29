import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { login, register } from "../services/authService";

// Helper to get token from AsyncStorage
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

export default function useAuth(onLoginSuccess?: () => void) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      setIsAuthenticated(true);
      if (onLoginSuccess) onLoginSuccess();
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
      await register(email, password, confirmPassword, username);
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

  // Optionally, add a logout handler
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("token_type");
    setIsAuthenticated(false);
    setScreen("login");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
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
    username,
    setUsername,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleForgotPassword,
    handleLogout,
  };
}