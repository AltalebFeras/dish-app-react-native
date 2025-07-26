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

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      setIsAuthenticated(true);
      token: data.token
        // Store token in secure storage or context
        // Navigate to the main app screen
        
        Alert.alert("Success", "Login successful!");
    } catch (e) {
      Alert.alert("Login Error", "Invalid credentials or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await authService.register(email, password, confirmPassword, firstName, lastName);
      Alert.alert("Success", "Registration successful. Please log in.");
      setScreen("login");
    } catch (e) {
      Alert.alert("Register Error", "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Reset", "Password reset link sent (mock).");
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
    handleLogin,
    handleRegister,
    handleForgotPassword,
  };
}
