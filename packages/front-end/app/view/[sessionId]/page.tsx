"use client";

import "@/utils/pdfWorkerPolyfill";
import { User, SessionResponseDto } from "@/schema/backend.schema";
import HostViewer from "./_components/HostViewer";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import ParticipantViewer from "./_components/ParticipantViewer";

export default function Page({ params }: { params: { sessionId: string } }) {
  const [userQuery, sessionQuery] = useQueries({
    queries: [
      {
        queryKey: ["user", "profile"],
        queryFn: async () => await apiClient.get<User>("/user/profile"),
        throwOnError: true,
      },
      {
        queryKey: ["session", params.sessionId],
        queryFn: async () =>
          await apiClient.get<SessionResponseDto>(`/session`, {
            params: { id: params.sessionId },
          }),
        throwOnError: true,
      },
    ],
  });
  if (userQuery.isLoading || sessionQuery.isLoading) {
    return <h1>로딩...</h1>;
  }
  const userData = userQuery.data?.data;
  const sessionData = sessionQuery.data?.data;
  const userId = userData?.userId;
  const isHost = userData?.userId === sessionData?.hostId;
  if (userId === undefined) {
    return <h1>로딩...</h1>;
  }
  return isHost ? (
    <HostViewer params={{ ...params, userId: userId }} />
  ) : (
    <ParticipantViewer params={{ ...params, userId: userId }} />
  );
}
