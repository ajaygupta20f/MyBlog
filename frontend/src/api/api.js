// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://my-blog-5vii-owpunw7e4-ajay-guptas-projects.vercel.app",
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
