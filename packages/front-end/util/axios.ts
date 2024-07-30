import axios, { InternalAxiosRequestConfig } from "axios";
// just req with refresh_token
export const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// just retry req with access_token
export const retryClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// req with access_token and re-req with refresh_token when 401
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});


retryClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    console.log("success", response);
    return response.data;
  },
  async (error) => {
    const originalReq = error.config as InternalAxiosRequestConfig<any>;
    console.log(error, originalReq);
    if (error?.response?.status === 401) {
      try {
        await refreshClient.get("/auth/token-refresh");
        return retryClient(originalReq);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
