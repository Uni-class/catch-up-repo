import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

export const apiAuthClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});
