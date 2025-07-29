import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onRegister,
  onBackToLogin,
  isLoading,
  error,
}: any) {
  return (
    <View style={{ padding: 16, alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
      {error && <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>}
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: "#28A745",
          borderRadius: 8,
          width: "100%",
          marginBottom: 12,
          opacity: isLoading ? 0.6 : 1,
        }}
        onPress={onRegister}
        disabled={isLoading}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>
          {isLoading ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#007BFF", borderRadius: 8, width: "100%" }}
        onPress={onBackToLogin}
        disabled={isLoading}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
