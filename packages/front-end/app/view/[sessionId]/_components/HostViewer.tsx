"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useHostSocket } from "../_hooks/useHostSocket";
import { PainterInstanceGenerator, PDFPainter } from "@/PaintPDF/components";

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function HostViewer({
  params,
}: {
  params: { sessionId: string; userId: number };
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

  const store = useHostSocket(params.userId, params.sessionId);

  if (isLoading) {
    return <p>로딩...</p>;
  }
  if (isError || data?.fileList[0]?.url === undefined) {
    return <p>unable to load session: {params.sessionId}</p>;
  }

  if (data === undefined) {
    return null;
  }

  const pdfDocument = data.fileList[0];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PDFPainter
        painterId={`${data.sessionId}_${pdfDocument.fileId}`}
        pdfDocumentURL={pdfDocument.url}
      >
        <PainterInstanceGenerator instanceId={"Host"} readOnly={false} />
      </PDFPainter>
    </div>
  );
}
