import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordForm({
  email,
  setEmail,
  onSendReset,
  onBackToLogin,
}: any) {
  return (
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
      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#6C757D", borderRadius: 8, width: "100%", marginBottom: 12 }}
        onPress={onSendReset}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#007BFF", borderRadius: 8, width: "100%" }}
        onPress={onBackToLogin}
      >
        <Text style={{ color: "#FFF", textAlign: "center" }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
