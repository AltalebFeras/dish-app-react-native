import React from "react";
import { View } from "react-native";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import useAuth from "../../hooks/useAuth";

export default function Index() {
  const {
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
  } = useAuth();

  if (isAuthenticated) return null;

  let content = null;
  if (screen === "login") {
    content = (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
        onGoToRegister={() => setScreen("register")}
        onGoToForgot={() => setScreen("forgot")}
        isLoading={isLoading}
        error={error}
      />
    );
  } else if (screen === "register") {
    content = (
      <RegisterForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onRegister={handleRegister}
        onBackToLogin={() => setScreen("login")}
        isLoading={isLoading}
        error={error}
      />
    );
  } else if (screen === "forgot") {
    content = (
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
        onSendReset={handleForgotPassword}
        onBackToLogin={() => setScreen("login")}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {content}
    </View>
  );
}