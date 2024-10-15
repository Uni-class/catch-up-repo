"use client";

import { useHostSocket } from "../../_hooks/useHostSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  PDFPainterControlBar,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";
import { ViewerPropType } from "../../_types/ViewerType";
import { PreviewPages } from "../Common/PreviewPages";
import { css } from "@/styled-system/css";
import { ModeContainer, ModeControl } from "../Common/Mode";
import { useEnsureVisibleWhileDraw } from "../../_hooks/useEnsureVisibleWhileDraw";
import { useState } from "react";
import { CodeOverlay, CodeOverlayContainer } from "../Common/CodeOverlay";
import { usePostDraw } from "../../_hooks/usePostDraw";
import Button from "@/components/Button";
import { HostViewerDownload } from "../Common/Download";
import { Header } from "../Common/Header";
import { PageControl } from "../Common/PageControl";

export default function HostViewer(props: ViewerPropType) {
  const { fileList, sessionId } = props;
  const pdfDocument = fileList[0];
  const fileId = fileList[0].fileId;
  const pdfPainterControllerHook = usePDFPainterController({
    painterId: `${sessionId}_${pdfDocument.fileId}`,
  });
  const pdfPainterHostInstanceControllerHook = usePDFPainterInstanceController({
    editorId: "Host",
    pdfPainterController: pdfPainterControllerHook.pdfPainterController,
  });
  const { pdfPainterController } = pdfPainterControllerHook;
  const { pdfPainterInstanceController } = pdfPainterHostInstanceControllerHook;
  const { roomPageViewerCount } = useHostSocket(
    sessionId,
    fileId,
    pdfPainterInstanceController,
    pdfPainterController
  );
  useEnsureVisibleWhileDraw("Host", pdfPainterController);

  usePostDraw(
    sessionId,
    fileId,
    pdfPainterInstanceController,
    pdfPainterController
  );

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
          <ModeControl
            labelText="내 필기 가리기"
            id="hide-host-draw"
            checked={pdfPainterController.getInstanceHidden("Host")}
            onChange={(e) => {
              pdfPainterController.setInstanceHidden("Host", e.target.checked);
            }}
          />
        }
        downloadRender={
          <HostViewerDownload
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
          getBadgeVisible={(index) => roomPageViewerCount.hasOwnProperty(index)}
          getBadgeContent={(index) => {
            return <>{index !== undefined && roomPageViewerCount[index]}</>;
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
            flexDirection:"column",
            bg: "#F5F7FA",
          })}
        >
          <PDFPainter
            painterId={`${sessionId}_${pdfDocument.fileId}`}
            pdfDocumentURL={pdfDocument.url}
            customPdfPainterControllerHook={pdfPainterControllerHook}
          >
            <PainterInstanceGenerator
              instanceId={"Host"}
              readOnly={false}
              customPdfPainterInstanceControllerHook={
                pdfPainterHostInstanceControllerHook
              }
            />
          </PDFPainter>
          <PageControl pdfPainterController={pdfPainterController}/>
        </div>
      </div>
    </>
  );
}
