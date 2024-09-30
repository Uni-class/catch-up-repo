"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { apiClient } from "@/utils/axios";
import { useParticipantSocket } from "../_hooks/useParticipantSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  PDFPainterControlBar,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";
import { ViewerPropType } from "../_types/ViewerType";
import { css } from "@/styled-system/css";
import { PreviewPages } from "./PreviewPages";

export default function ParticipantViewer(props: ViewerPropType) {
  const { fileList, sessionId } = props;
  const pdfDocument = fileList[0];
  const fileId = fileList[0].fileId;
  const joinQuery = useQuery<AxiosResponse<any>>({
    queryKey: ["user", "session", sessionId, "join"],
    queryFn: async () => {
      return await apiClient.post(`/user/session/${sessionId}/join`);
    },
  });
  const pdfPainterControllerHook = usePDFPainterController({
    painterId: `${sessionId}_${pdfDocument.fileId}`,
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
  const { hostIndex } = useParticipantSocket(
    sessionId,
    fileId,
    pdfPainterHostInstanceControllerHook.pdfPainterInstanceController,
    pdfPainterControllerHook.pdfPainterController
  );

  if (joinQuery.isLoading) {
    return <p>로딩...</p>;
  }
  if (joinQuery.isError) {
    return <p>unable to load session: {sessionId}</p>;
  }

  return (
    <>
      <div
        className={css({
          display: "flex",
          width: "100vw",
          height: "calc(100vh - 4em)",
        })}
      >

          <PreviewPages
            pdfDocumentURL={pdfDocument.url}
            PDFPainterController={pdfPainterControllerHook.pdfPainterController}
            getBadgeVisible={(index) => index === hostIndex}
            getBadgeContent={(index) => {
              return <>{index !== undefined && hostIndex !== null && "!"}</>;
            }}
          />
          <div
            className={css({
              justifyContent: "center",
              alignItems: "center",
              width: `calc(100% - 13rem)`,
              height: "100%",
              display: "flex",
            })}
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
        </div>
      <PDFPainterControlBar
        pdfPainterController={pdfPainterControllerHook.pdfPainterController}
      />
    </>
  );
}
