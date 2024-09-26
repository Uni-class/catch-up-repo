"use client";

import { ReactNode, createContext, useContext, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { User } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useRouter } from "@/hook/useRouter";

const AccountContext = createContext<{
  updateAccount: () => void;
  logout: () => void;
  getContinueString: () => string;
  getLoginURL: () => string;
  goToLogin: () => void;
  isLoading: boolean;
  account: User | null;
}>({
  updateAccount: () => {},
  logout: () => {},
  getContinueString: () => "",
  getLoginURL: () => "",
  goToLogin: () => {},
  isLoading: true,
  account: null,
});

export const useAccount = () => {
  return useContext(AccountContext).account;
};

export const useAccountController = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { data: response, isLoading } = useQuery<AxiosResponse<User>>({
    queryKey: ["user", "profile"],
    queryFn: async () => await apiClient.get("/user/profile"),
  });
  const router = useRouter();

  const getContinueString = useCallback(() => {
    const currentURL = router.getURL();
    return `${currentURL.pathname}${currentURL.search}`;
  }, [router]);

  const getLoginURL = useCallback(() => {
    const newURL = new URL("/login", router.getURL());
    newURL.searchParams.set("continue", getContinueString());
    return newURL.href;
  }, [router, getContinueString]);

  const goToLogin = useCallback(() => {
    router.push(getLoginURL());
  }, [router, getLoginURL]);

  const data: User | null = response?.data || null;

  return (
    <AccountContext.Provider
      value={{
        updateAccount: () => {}, //need fix
        logout: () => {}, //need fix
        getContinueString: getContinueString,
        getLoginURL: getLoginURL,
        goToLogin: goToLogin,
        isLoading: isLoading,
        account: data,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
