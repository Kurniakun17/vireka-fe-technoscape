import { API_URL } from "@/constants/apiURL";
import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign-up`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};

export const getMe = async (token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user data");
  }

  return response.json();
};
