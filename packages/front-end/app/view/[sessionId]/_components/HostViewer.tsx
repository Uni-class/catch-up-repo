"use client";

import "@/utils/pdfWorkerPolyfill";
import PDFViewer from "@/components/DocumentViewer/PDF/PDFViewer";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { css } from "@/styled-system/css";
import { Tldraw } from "tldraw";
import { useHostSocket } from "../_hooks/useHostSocket";

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function HostViewer({
  params,
}: {
  params: { sessionId: string };
}) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<AxiosResponse<SessionReturnType>>({
    queryKey: ["session", params.sessionId],
    queryFn: async () => {
      return await apiClient.get(`/session`, {
        params: { id: params.sessionId },
      });
    },
  });
  const data = response?.data;

  const store = useHostSocket();

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
      <div
        className={css({
          width: "100%",
          position: "absolute",
          inset: 0,
          zIndex: 50,
        })}
      >
        <Tldraw store={store} />
      </div>
    </div>
  ) : (
    <></>
  );
}
