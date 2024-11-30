'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { User } from '@/schema/backend.schema';
import { apiClient } from '@/utils/axios';
import { useRouter } from '@/hook/useRouter';

export const useAccountController = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<AxiosResponse<User>>({
    queryKey: ['user', 'profile'],
    queryFn: async () => await apiClient.get('/user/profile'),
    throwOnError: false,
  });
  const router = useRouter();

  const getLoginURL = useCallback(() => {
    return `/login?url=${encodeURIComponent(`${router.pathname}?${router.query.toString()}`)}`; //need fix
  }, [router]);

  const goToLogin = useCallback(() => {
    router.push(getLoginURL());
  }, [router, getLoginURL]);

  const goToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const data: User | null = response?.data || null;

  return {
    updateAccount: () => {}, //need fix
    logout: () => {}, //need fix
    getLoginURL: getLoginURL,
    goToLogin: goToLogin,
    goToDashboard: goToDashboard,
    isLoading: isLoading,
    account: data,
    isError: isError,
  };
};

export const useAccount = () => {
  const controller = useAccountController();
  return controller.account;
};
