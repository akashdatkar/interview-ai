import axios from "axios";

// Use VITE_API_BASE_URL (deployed backend) and ensure no trailing slash.
// Accept either the backend root or a URL that already includes /api/auth.
const _base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const normalizedBase = _base.replace(/\/$/, "").replace(/\/api\/auth$/i, "");

const api = axios.create({
  baseURL: `${normalizedBase}/api/auth`,
  withCredentials: true, // Include credentials in the request allow to store the session cookie in the browser
});

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    console.error("Registration error:", error);
    throw new Error(message);
  }
}

export async function login(email, password) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    console.error("Login error:", error);
    throw new Error(message);
  }
}

export async function logout() {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Logout failed";
    console.error("Logout error:", error);
    throw new Error(message);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Unable to fetch user";
    console.error("GetMe error:", error);
    throw new Error(message);
  }
}


   