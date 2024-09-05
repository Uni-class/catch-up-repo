"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useParticipantSocket } from "../_hooks/useParticipantSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function ParticipantViewer({
  params,
}: {
  params: { sessionId: string; userId: number };
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
      return await apiClient.get(`/session`, {
        params: { id: params.sessionId },
      });
    },
    enabled: !!joinQuery.data,
  });
  const data = response?.data;
  const pdfPainterControllerHook = usePDFPainterController({
    painterId: "Session123_File123",
  });
  const pdfPainterHostInstanceControllerHook = usePDFPainterInstanceController({
    editorId: "Host",
    pdfPainterController: pdfPainterControllerHook.pdfPainterController,
  });
  const pdfPainterParticipantInstanceControllerHook =
    usePDFPainterInstanceController({
      editorId: "Participant",
      pdfPainterController: pdfPainterControllerHook.pdfPainterController,
    });
  const store = useParticipantSocket(params.userId, params.sessionId,pdfPainterHostInstanceControllerHook);

  if (isLoading || joinQuery.isLoading) {
    return <p>로딩...</p>;
  }
  if (joinQuery.isError || isError || data?.fileList[0]?.url === undefined) {
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
        customPdfPainterControllerHook={pdfPainterControllerHook}
      >
        <PainterInstanceGenerator
          instanceId={"Host"}
          readOnly={true}
          customPdfPainterInstanceControllerHook={
            pdfPainterHostInstanceControllerHook
          }
        />
        <PainterInstanceGenerator
          instanceId={"Participant"}
          readOnly={false}
          customPdfPainterInstanceControllerHook={
            pdfPainterParticipantInstanceControllerHook
          }
        />
      </PDFPainter>
    </div>
  );
}
