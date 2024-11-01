"use client";

import "@/utils/pdfWorkerPolyfill";
import { User, SessionResponseDto } from "@/schema/backend.schema";
import HostViewer from "./_components/Host/HostViewer";
import { useQueries } from "@tanstack/react-query";
import { apiClient, refreshClient } from "@/utils/axios";
import ParticipantViewer from "./_components/Participant/ParticipantViewer";
import { useAtom } from "jotai";
import { socketAtom } from "@/client/socketAtom";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "@/hook/useRouter";

/**
 * This is internal interface from `@socket.io/component-emitter` used in `socket.io-client`.
 * `socket.io-client` doesn't export this interface, so we have to define it here.
 */
interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

const getAPIQueryParam = (obj: {
  id?: number;
  code?: string;
}): { id: number } | { code: string } => {
  if (obj.id !== undefined) {
    return { id: obj.id };
  }
  if (obj.code !== undefined) {
    return { code: obj.code };
  }
  throw new Error("You must specify id or code.");
};
export default function Page() {
  const router = useRouter();
  const queryObj = router.queryObj as unknown as { id?: number; code?: string };
  const apiQueryParam = getAPIQueryParam(queryObj);

  const [userQuery, sessionQuery] = useQueries({
    queries: [
      {
        queryKey: ["user", "profile"],
        queryFn: async () => await apiClient.get<User>("/user/profile"),
        throwOnError: true,
      },
      {
        queryKey: ["session", apiQueryParam],
        queryFn: async () =>
          await apiClient.get<SessionResponseDto>(`/session`, {
            params: apiQueryParam,
          }),
        throwOnError: true,
      },
    ],
  });
  const [, setSocket] = useAtom(socketAtom);
  useEffect(() => {
    let newSocket: null | Socket<DefaultEventsMap, DefaultEventsMap> = null;
    const disConnectHandler = async (_reason: Socket.DisconnectReason) => {
      await refreshClient.get("/auth/token-refresh");
    };
    const init = async () => {
      await refreshClient.get("/auth/token-refresh");
      newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
        withCredentials: true,
        transports: ["websocket"],
      });
      setSocket(newSocket);
      newSocket.on("disconnect", disConnectHandler);
    };
    init();
    return () => {
      if (newSocket !== null) {
        newSocket.off("disconnect", disConnectHandler);
        newSocket.disconnect();
      }
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
