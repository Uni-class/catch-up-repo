import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// just req with access_token
export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

// just req with refresh_token
export const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

// req with access_token and re-req with refresh_token when 401
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

authClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

refreshClient.interceptors.request.use(
  (config) => {
    const refreshToken = Cookies.get("refresh_token");
    config.headers.Authorization = `Bearer ${refreshToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log({error});
    const originalReq = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
    };
    if (error?.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        await refreshClient.get("/token-refresh");
        return authClient(originalReq);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
