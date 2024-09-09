"use client";

import "@/utils/pdfWorkerPolyfill";
import { User, SessionResponseDto } from "@/schema/backend.schema";
import HostViewer from "./_components/HostViewer";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import ParticipantViewer from "./_components/ParticipantViewer";
import { useAtom, useSetAtom } from "jotai";
import { socketAtom } from "@/client/socketAtom";
import { useEffect } from "react";
import { io } from "socket.io-client";

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
  const [, setSocket] = useAtom(socketAtom);
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
      withCredentials: true,
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  if (userQuery.isLoading || sessionQuery.isLoading) {
    return <h1>로딩...</h1>;
  }
  if (userQuery.data === undefined || sessionQuery.data === undefined) {
    return <></>;
  }
  const userData = userQuery.data.data;
  const sessionData = sessionQuery.data.data;
  const userId = userData.userId;
  const isHost = userData.userId === sessionData.hostId;
  return isHost ? (
    <HostViewer {...{ ...sessionData, userId: userId }} />
  ) : (
    <ParticipantViewer {...{ ...sessionData, userId: userId }} />
  );
}
