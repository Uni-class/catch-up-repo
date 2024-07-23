import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

export const apiAuthClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

apiAuthClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAuthClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      const config = error.config as InternalAxiosRequestConfig<any>;
      const refreshToken = Cookies.get("refresh_token");
      try {
        await apiClient.get("/token/refresh", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        return apiAuthClient(config);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
