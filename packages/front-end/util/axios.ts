import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      const config = error.config as InternalAxiosRequestConfig<any>;
      try {
        await apiClient.get("/token-refresh");
        return apiClient(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);