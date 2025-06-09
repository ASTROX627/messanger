import axios from "axios";
import Cookies from "js-cookie"
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
  baseURL: BASE_URL,
  headers:{
    "Content-Type": "application/json"
  },
  withCredentials: true
})

export const httpInterceptedService = axios.create({
  baseURL: BASE_URL
})

httpInterceptedService.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`)
    }
    return config
  },
  (error) => Promise.reject(error)
)

httpInterceptedService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await httpService.post("/auth/refresh");
        const {accessToken} = response.data;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return httpInterceptedService(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Redirecting to login page...");
        window.location.href = "/login";
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)