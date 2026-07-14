import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
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


   