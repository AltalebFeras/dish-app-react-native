import { useAuthContext } from "../context/AuthContext";

// Helper to get token from AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

export default function useAuth() {
  return useAuthContext();
}