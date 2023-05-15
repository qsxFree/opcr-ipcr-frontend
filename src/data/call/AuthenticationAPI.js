import axiosInstance from "../static/axiosInstance";

export const AuthenticationAPI = {
  login: (credentials) => axiosInstance.post(`/login`, credentials),

  logout: () => axiosInstance.post("/logout"),

  registerCookie: () => axiosInstance.get(`/sanctum/csrf-cookie`),
};
