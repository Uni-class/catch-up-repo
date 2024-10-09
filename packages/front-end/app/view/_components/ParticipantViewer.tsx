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
import { useState } from "react";
import { ModeControl } from "./Mode";
import { useEnsureVisibleWhileDraw } from "../_hooks/useEnsureVisibleWhileDraw";
import { CodeOverlay, CodeOverlayContainer } from "./CodeOverlay";
import { usePostDraw } from "../_hooks/usePostDraw";
import Button from "@/components/Button";

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
  const [isChaseMode, setIsChaseMode] = useState(false);
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
  const { pdfPainterController } = pdfPainterControllerHook;
  const { hostIndex } = useParticipantSocket(
    sessionId,
    fileId,
    pdfPainterHostInstanceControllerHook.pdfPainterInstanceController,
    pdfPainterControllerHook.pdfPainterController,
    isChaseMode
  );
  useEnsureVisibleWhileDraw("Participant", pdfPainterController);
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);
  usePostDraw(
    sessionId,
    fileId,
    pdfPainterParticipantInstanceControllerHook.pdfPainterInstanceController,
    pdfPainterController
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
          PDFPainterController={pdfPainterController}
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
            position: "relative",
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
          {showCodeOverlay && (
            <CodeOverlayContainer setShowCodeOverlay={setShowCodeOverlay}>
              <CodeOverlay code={props.sessionCode} />
            </CodeOverlayContainer>
          )}
        </div>
      </div>
      <PDFPainterControlBar
        pdfPainterController={pdfPainterController}
        showCodeOverlay={showCodeOverlay}
        setShowCodeOverlay={setShowCodeOverlay}
        modeComponent={
          <>
            <ModeControl
              labelText="호스트 시점 따라가기"
              id="chase-host"
              checked={isChaseMode}
              onChange={(e) => {
                setIsChaseMode(e.target.checked);
              }}
            />
            <ModeControl
              labelText="호스트 필기 가리기"
              id="hide-host-draw"
              checked={pdfPainterController.getInstanceHidden("Host")}
              onChange={(e) => {
                pdfPainterController.setInstanceHidden(
                  "Host",
                  e.target.checked
                );
              }}
            />
            <ModeControl
              labelText="내 필기 가리기"
              id="hide-my-draw"
              checked={pdfPainterController.getInstanceHidden("Participant")}
              onChange={(e) => {
                pdfPainterController.setInstanceHidden(
                  "Participant",
                  e.target.checked
                );
              }}
            />
          </>
        }
        downloadComponent={
          <>
            <ModeControl labelText="내 필기 포함" id="parti-draw" />
            <ModeControl labelText="호스트 필기 포함" id="host-draw" />
            <Button
              className={css({
                width: "100%",
                height: "2rem",
                padding: "0.25rem",
                marginTop: "0.25rem",
              })}
            >
              다운로드
            </Button>
          </>
        }
      />
    </>
  );
}