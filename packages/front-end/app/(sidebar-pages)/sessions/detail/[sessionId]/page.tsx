"use client";

import { apiClient } from "@/utils/axios";
import { useQueries } from "@tanstack/react-query";
import HostSession from "./_components/HostSession";
import { SessionResponseDto, User } from "@/schema/backend.schema";
import ParticipantSession from "./_components/ParticipantSession";

interface PropType {
  params: { sessionId: string };
}

export default function Page({ params }: PropType) {
  const sessionId = Number(params.sessionId);
  const [
    { data: userRes, isLoading: isUserLoading },
    { data: sessionRes, isLoading: isSessionLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["user", "profile"],
        queryFn: async () => await apiClient.get<User>("/user/profile"),
        throwOnError: true,
      },
      {
        queryKey: ["session", sessionId],
        queryFn: async () =>
          await apiClient.get<SessionResponseDto>(`/session/${sessionId}`),
        throwOnError: true,
      },
    ],
  });
  if (isUserLoading || isSessionLoading) {
    return <h1>로딩...</h1>;
  }
  const sessionData = sessionRes?.data;
  const userData = userRes?.data;

  return (
    sessionData !== undefined &&
    userData !== undefined &&
    (userData.userId === sessionData.hostId ? (
      <HostSession sessionData={sessionData} />
    ) : (
      <ParticipantSession sessionData={sessionData} />
    ))
  );
}
