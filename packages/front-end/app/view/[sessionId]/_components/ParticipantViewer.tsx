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
import { ViewerPropType } from "../_types/ViewerType";

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function ParticipantViewer(props: ViewerPropType) {
  const { sessionName, fileList, userId, sessionId } = props;
  const pdfDocument = fileList[0];
  const joinQuery = useQuery<AxiosResponse<any>>({
    queryKey: ["user", "session", sessionId, "join"],
    queryFn: async () => {
      return await apiClient.post(`/user/session/${sessionId}/join`);
    },
  });
  const pdfPainterControllerHook = usePDFPainterController({
    painterId: `${sessionName}_${pdfDocument.fileId}`,
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
  useParticipantSocket(userId, sessionId, pdfPainterHostInstanceControllerHook);

  if (joinQuery.isLoading) {
    return <p>로딩...</p>;
  }
  if (joinQuery.isError) {
    return <p>unable to load session: {sessionId}</p>;
  }

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
        painterId={`${sessionId}_${pdfDocument.fileId}`}
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
