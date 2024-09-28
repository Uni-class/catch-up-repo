"use client";

import { ReactNode, createContext, useContext, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { User } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";

const AccountContext = createContext<{
  updateAccount: () => void;
  logout: () => void;
  getLoginURL: () => string;
  goToLogin: () => void;
  goToDashboard: () => void;
  isLoading: boolean;
  account: User | null;
  isError: null | boolean;
}>({
  updateAccount: () => {},
  logout: () => {},
  getLoginURL: () => "",
  goToLogin: () => {},
  goToDashboard: () => {},
  isLoading: true,
  account: null,
  isError: false,
});

export const useAccount = () => {
  return useContext(AccountContext).account;
};

export const useAccountController = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<AxiosResponse<User>>({
    queryKey: ["user", "profile"],
    queryFn: async () => await apiClient.get("/user/profile"),
  });
  const router = useRouter();

  const getLoginURL = useCallback(() => {
    return `/login?url=${encodeURIComponent(`${router.pathname}?${router.query.toString()}`)}`; //need fix
  }, [router]);

  const goToLogin = useCallback(() => {
    router.push(getLoginURL());
  }, [router, getLoginURL]);

  const goToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const data: User | null = response?.data || null;

  return (
    <AccountContext.Provider
      value={{
        updateAccount: () => {}, //need fix
        logout: () => {}, //need fix
        getLoginURL: getLoginURL,
        goToLogin: goToLogin,
        goToDashboard: goToDashboard,
        isLoading: isLoading,
        account: data,
        isError: isError,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
