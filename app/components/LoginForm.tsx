import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onGoToRegister,
  onGoToForgot,
  isLoading,
}: any) {
  return (
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
        style={{ padding: 16, backgroundColor: "#007BFF", borderRadius: 8, width: "100%", marginBottom: 12, opacity: isLoading ? 0.6 : 1 }}
        onPress={onLogin}
        disabled={isLoading}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#28A745", borderRadius: 8, width: "100%", marginBottom: 12 }}
        onPress={onGoToRegister}
        disabled={isLoading}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>Go to Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#6C757D", borderRadius: 8, width: "100%" }}
        onPress={onGoToForgot}
        disabled={isLoading}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
