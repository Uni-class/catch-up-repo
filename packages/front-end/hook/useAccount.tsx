"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useCallback,
  Suspense,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { User } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useRouter } from "@/hook/useRouter";

const AccountContext = createContext<{
  updateAccount: () => void;
  logout: () => void;
  getLoginURL: () => string;
  goToLogin: () => void;
  isLoading: boolean;
  account: User | null;
}>({
  updateAccount: () => {},
  logout: () => {},
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

  const getLoginURL = useCallback(() => {
    return `/login?url=${encodeURIComponent(`${router.pathname}?${router.query.toString()}`)}`; //need fix
  }, [router]);

  const goToLogin = useCallback(() => {
    router.push(getLoginURL());
  }, [router, getLoginURL]);

  const data: User | null = response?.data || null;

  return (
    <Suspense>
      <AccountContext.Provider
        value={{
          updateAccount: () => {}, //need fix
          logout: () => {}, //need fix
          getLoginURL: getLoginURL,
          goToLogin: goToLogin,
          isLoading: isLoading,
          account: data,
        }}
      >
        {children}
      </AccountContext.Provider>
    </Suspense>
  );
};
