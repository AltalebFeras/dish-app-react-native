import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import useAuth from "../../hooks/useAuth";

export default function Index() {
  const router = useRouter();
  // Pass a callback to navigate to /profile after login
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
    username,
    setUsername,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleForgotPassword,
  } = useAuth(() => {
    router.replace("/profile");
  });

  // Optionally, if already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/profile");
    }
  }, [isAuthenticated]);

  // Always render a View so the tab bar is visible
  if (isAuthenticated) return <View style={{ flex: 1 }} />;

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
        username={username}
        setUsername={setUsername}
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
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      {content}
    </View>
  );
}

// Ensure the tab bar is visible on the auth page
export const options = {
  headerShown: false,
  tabBarStyle: { display: "flex" },
};