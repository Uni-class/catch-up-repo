"use client";
import { useRouter } from "@/hook/useRouter";
import { User } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ReactNode, useEffect } from "react";

export default function RedirectToLogin() {
  const { error } = useQuery<AxiosResponse<User>>({
    queryKey: ["user", "profile"],
    queryFn: async () => await apiClient.get("/user/profile"),
  });
  const router = useRouter();
  useEffect(() => {
    if (error !== null) {
      const currentURL = encodeURIComponent(
        `${router.pathname}?${router.query.toString()}`
      );
      router.push(`/login?url=${currentURL}`);
    }
  }, [error, router]);
  return <></>;
}
