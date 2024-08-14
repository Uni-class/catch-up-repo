"use client";

import "@/utils/pdfWorkerPolyfill";
import PDFViewer from "@/components/DocumentViewer/PDF/PDFViewer";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { css } from "@/styled-system/css";
import { Tldraw } from "tldraw";
import { useEffect } from "react";
import io from 'socket.io-client';

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function HostViewer({ params }: { params: { sessionId: string } }) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<AxiosResponse<SessionReturnType>>({
    queryKey: ["session", params.sessionId],
    queryFn: async () => {
      return await apiClient.get(`/session/${params.sessionId}`);
    },
  });
  const data = response?.data;
  
  useEffect(() => {
    // 서버에 연결
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string,{
      withCredentials: true,
    }); // 백엔드 서버의 주소로 대체
    // 연결 성공시 실행
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    // Clean up when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <p>로딩...</p>;
  }
  if (isError || data?.fileList[0]?.url === undefined) {
    return <p>unable to load session: {params.sessionId}</p>;
  }



  return data !== undefined ? (
    <div
      className={css({
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      })}
    >
      <PDFViewer documentURL={data.fileList[0]?.url} />
      <div className={css({ width: "100%", position: "absolute", inset: 0 })}>
        <Tldraw />
      </div>
    </div>
  ) : (
    <></>
  );
}
