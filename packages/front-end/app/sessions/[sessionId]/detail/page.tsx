"use client";

import { apiClient } from "@/util/axios";
import { useQueries, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface PropType {
  params: { sessionId: string };
}

export default function Page({ params }: PropType) {
  const sessionId = Number(params.sessionId);
  const [
    { data: userRes, isLoading: isUserLoading },
    { data: sessionRes, isLoading: isSessionLoading },
  ] = useQueries<[AxiosResponse<any>, AxiosResponse<any>]>({
    queries: [
      {
        queryKey: ["user", "profile"],
        queryFn: async () => await apiClient.get("/user/profile"),
        throwOnError: true,
      },
      {
        queryKey: ["session", sessionId],
        queryFn: async () => await apiClient.get(`/session/${sessionId}/info`),
        throwOnError: true,
      },
    ],
  });
  if (isUserLoading || isSessionLoading) {
    return <h1>로딩...</h1>;
  }

  return <></>;
}
