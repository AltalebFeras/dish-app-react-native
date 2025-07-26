import { API_BASE_URL } from "../constants/constants";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
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
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}



export const tasksApi = {
  async getAllTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const json = await response.json();
      
      if (json.success == true) {
        return json.data;
      } else {
        throw new Error(json.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
};