import AsyncStorage from "@react-native-async-storage/async-storage";

// Use the new login API endpoint
const API_BASE_URL = "https://simplats-backend-main-854o9w.laravel.cloud/api/auth";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let errorMessage = "An unexpected error occurred. Please try again later.";
  let data: any = null;
  try {
    data = await res.clone().json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    if (data && data.message) {
      errorMessage = data.message;
    } else if (res.status === 400) {
      errorMessage = "Bad Request: Please check your input.";
    } else if (res.status === 401) {
      errorMessage = "Unauthorized: Invalid credentials.";
    } else if (res.status === 403) {
      errorMessage = "Forbidden: You do not have permission to access this resource.";
    } else if (res.status === 404) {
      errorMessage = "Not Found: The requested resource could not be found.";
    }
    throw new Error(errorMessage);
  }

  // Save token to AsyncStorage
  if (data?.token) {
    await AsyncStorage.setItem("token", data.token);
    console.log("Token saved to AsyncStorage:", data.token);
    
    await AsyncStorage.setItem("token_type", data.token_type || "Bearer");
  }

  return data;
}

export async function register(
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string
) {
  const res = await fetch(`${API_BASE_URL}/register`, {
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

  let errorMessage = "An unexpected error occurred. Please try again later.";
  let errorData: any = null;
  try {
    errorData = await res.clone().json();
  } catch {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    if (errorData && errorData.message) {
      errorMessage = errorData.message;
      // Optionally append field errors if present
      if (errorData.errors) {
        const fieldErrors = Object.values(errorData.errors)
          .filter(Boolean)
          .map((v) => String(v));
        if (fieldErrors.length > 0) {
          errorMessage += "\n" + fieldErrors.join("\n");
        }
      }
    } else if (res.status === 400) {
      errorMessage = "Bad Request: Please check your input.";
    } else if (res.status === 401) {
      errorMessage = "Unauthorized: Invalid credentials.";
    } else if (res.status === 403) {
      errorMessage = "Forbidden: You do not have permission to access this resource.";
    } else if (res.status === 404) {
      errorMessage = "Not Found: The requested resource could not be found.";
    } else if (res.status === 409) {
      errorMessage = "Conflict: The email is already registered.";
    }
    throw new Error(errorMessage);
  }
  return errorData || res.json();
}
