"use client";

import "@/utils/pdfWorkerPolyfill";
import PDFViewer from "@/components/DocumentViewer/PDF/PDFViewer";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { css } from "@/styled-system/css";
import { Tldraw } from "tldraw";

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function ParticipantViewer({
  params,
}: {
  params: { sessionId: string };
}) {
  // user/session/:sessionId/join
  const joinQuery = useQuery<AxiosResponse<any>>({
    queryKey: ["user", "session", params.sessionId, "join"],
    queryFn: async () => {
      return await apiClient.post(`/user/session/${params.sessionId}/join`);
    },
  });
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<AxiosResponse<SessionReturnType>>({
    queryKey: ["session", params.sessionId],
    queryFn: async () => {
      return await apiClient.get(`/session/${params.sessionId}`);
    },
    enabled: !!joinQuery.data,
  });
  const data = response?.data;
  console.log("req to", `/session/${params.sessionId}`, params);
  console.log({ data });

  if (isLoading || joinQuery.isLoading) {
    return <p>로딩...</p>;
  }
  if (joinQuery.isError || isError || data?.fileList[0]?.url === undefined) {
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