import api from "./axios";

/**
 * Login
 */
export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

/**
 * Register
 */
export const register = (userData) => {
  return api.post("/auth/register", userData);
};

/**
 * Ambil data user yang sedang login
 */
export const getProfile = () => {
  return api.get("/auth/profile");
};