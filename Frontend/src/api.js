import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// ✅ Login User - Uses the correct login endpoint
export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/api/login/`, credentials);
};

// ✅ Signup User
export const signupUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/api/signup/`, userData);
};

// ✅ Refresh Access Token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw error;
  }
};

  