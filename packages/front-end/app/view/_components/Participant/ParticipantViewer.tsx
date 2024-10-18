"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { apiClient } from "@/utils/axios";
import { useParticipantSocket } from "../../_hooks/useParticipantSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  PDFPainterControlBar,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";
import { ViewerPropType } from "../../_types/ViewerType";
import { css } from "@/styled-system/css";
import { PreviewPages } from "../Common/PreviewPages";
import { useState } from "react";
import { ModeControl } from "../Common/Mode";
import { useEnsureVisibleWhileDraw } from "../../_hooks/useEnsureVisibleWhileDraw";
import { CodeOverlay, CodeOverlayContainer } from "../Common/CodeOverlay";
import { usePostDraw } from "../../_hooks/usePostDraw";
import Button from "@/components/Button/Button";
import { ParticipantViewerDownload } from "../Common/Download";
import { Header } from "../Common/Header";
import { PageControl } from "../Common/PageControl";
import HostIcon from "@/public/icons/host.svg";

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
      <Header
        pdfPainterController={pdfPainterController}
        codeRender={
          <CodeOverlayContainer>
            <CodeOverlay code={props.sessionCode} />
          </CodeOverlayContainer>
        }
        modeRender={
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
        downloadRender={
          <ParticipantViewerDownload
            src={pdfDocument.url}
            pdfPainterController={pdfPainterController}
            fileId={fileId}
            sessionId={sessionId}
            fileName={pdfDocument.name}
          />
        }
      />
      <div
        className={css({
          display: "flex",
          width: "100vw",
          height: "calc(100vh - 4.2rem)",
        })}
      >
        <PreviewPages
          pdfDocumentURL={pdfDocument.url}
          PDFPainterController={pdfPainterController}
          getBadgeVisible={(index) => index === hostIndex}
          getBadgeContent={(index) =>
            index !== undefined &&
            hostIndex !== null && (
              <div
                className={css({
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  fontSize: "0.9rem",
                  borderRadius: "50%",
                  bg: "primary.300",
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "white",
                })}
              >
                <HostIcon width="1em" height="1em" />
              </div>
            )
          }
        />
        <div
          className={css({
            justifyContent: "center",
            alignItems: "center",
            width: `calc(100% - 13rem)`,
            height: "100%",
            display: "flex",
            position: "relative",
            flexDirection: "column",
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
          <PageControl pdfPainterController={pdfPainterController} />
        </div>
      </div>
    </>
  );
}
