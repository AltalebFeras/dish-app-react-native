import React, { useState } from "react";
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Register form fields
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Hide the page if authenticated
  if (isAuthenticated) return null;

  // Helper to get correct API base URL for web, emulator, or device
  const getApiBaseUrl = () => {
    if (Platform.OS === "web") {
      return "https://127.0.0.1:8000";
    }
    return Platform.OS === "android"
      ? "http://10.0.2.2:8000"
      : "http://localhost:8000";
  };

  // API handlers
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${getApiBaseUrl()}/api/login`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.token);
      setIsAuthenticated(true);
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
      const apiUrl = `${getApiBaseUrl()}/api/register`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          confirm_password: confirmPassword,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      if (!res.ok) throw new Error("Register failed");
      Alert.alert("Success", "Registration successful. Please log in.");
      setScreen("login");
    } catch (e) {
      Alert.alert("Register Error", "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // UI for each screen
  let content = null;
  if (screen === "login") {
    content = (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: "#007BFF", borderRadius: 8, width: "100%", marginBottom: 12 }}
          onPress={handleLogin}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: "#28A745", borderRadius: 8, width: "100%", marginBottom: 12 }}
          onPress={() => setScreen("register")}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>Go to Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: "#6C757D", borderRadius: 8, width: "100%" }}
          onPress={() => setScreen("forgot")}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (screen === "register") {
    content = (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: "#28A745",
            borderRadius: 8,
            width: "100%",
            marginBottom: 12,
            opacity: isLoading ? 0.6 : 1,
          }}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>
            {isLoading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: "#007BFF", borderRadius: 8, width: "100%" }}
          onPress={() => setScreen("login")}
          disabled={isLoading}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (screen === "forgot") {
    content = (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Forgot Password</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, width: "100%", marginBottom: 12, padding: 8, borderRadius: 6 }}
        />
        {/* Implement forgot password logic here */}
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: "#6C757D", borderRadius: 8, width: "100%", marginBottom: 12 }}
          onPress={() => Alert.alert("Reset", "Password reset link sent (mock).")}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>Send Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 16, backgroundColor: "#007BFF", borderRadius: 8, width: "100%" }}
          onPress={() => setScreen("login")}
        >
          <Text style={{ color: "#FFF", textAlign: "center" }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {content}
    </View>
  );
}