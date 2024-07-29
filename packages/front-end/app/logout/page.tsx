"use client";

import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useEffect } from "react";
import { useRouter } from "@/hook/useRouter";

export default function Page() {
  const router = useRouter();
  const logout = () => {
    apiClient.post("/auth/logout")
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        router.push("/");
      });
  };

  useEffect(() => {
    logout();
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
