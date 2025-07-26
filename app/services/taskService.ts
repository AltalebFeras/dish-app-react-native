import { API_BASE_URL } from "../constants/constants";
import { getToken } from "../hooks/useAuth";

export async function getAllTasks() {
  const token = await getToken();
  if (!token) throw { code: 401, message: "Invalid credentials." };

  const response = await fetch(`${API_BASE_URL}/taskss`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorMsg = "Failed to fetch tasks";
    try {
      const err = await response.json();
      if (err && err.message) errorMsg = err.message;
      throw { code: response.status, message: errorMsg };
    } catch {
      throw { code: response.status, message: errorMsg };
    }
  }

  return await response.json();
}
