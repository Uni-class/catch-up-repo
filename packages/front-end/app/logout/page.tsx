"use client";

import { css } from "@/styled-system/css";
import { apiClient } from "@/utils/axios";
import { useEffect } from "react";
import { useRouter } from "@/hook/useRouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutMutate = useMutation({
    mutationFn: async () => await apiClient.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.push("/");
    },
    onError: (error) => {
      alert(`넌 로그아웃할 수 없다:${error.message}`);
      router.push("/");
    },
  });

  useEffect(() => {
    logoutMutate.mutate();
  }, []);

  return (
    <div
      className={css({
        display: "flex",
        paddingBottom: "3em",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <div
        className={css({
          display: "flex",
          padding: "2em 0",
          width: "25em",
          flexDirection: "column",
          alignItems: "center",
          gap: "1em",
          fontSize: "1.5em",
          fontWeight: "bold",
        })}
      >
        로그아웃 중...
      </div>
    </div>
  );
}
