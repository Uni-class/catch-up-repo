"use client";

import { useHostSocket } from "../_hooks/useHostSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  PDFPainterControlBar,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";
import { ViewerPropType } from "../_types/ViewerType";
import { PreviewPages } from "./PreviewPages";
import { css } from "@/styled-system/css";
import { ModeControl } from "./Mode";
import { useEnsureVisibleWhileDraw } from "../_hooks/useEnsureVisibleWhileDraw";
import { useState } from "react";
import { CodeOverlay, CodeOverlayContainer } from "./CodeOverlay";
import { usePostDraw } from "../_hooks/usePostDraw";

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
  const [showCodeOverlay, setShowCodeOverlay] = useState(false);
  usePostDraw(
    sessionId,
    fileId,
    pdfPainterInstanceController,
    pdfPainterController
  );

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
          {showCodeOverlay && (
            <CodeOverlayContainer setShowCodeOverlay={setShowCodeOverlay}>
              <CodeOverlay code={"1234"} />
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
              labelText="내 필기 가리기"
              id="hide-host-draw"
              checked={pdfPainterController.getInstanceHidden("Host")}
              onChange={(e) => {
                pdfPainterController.setInstanceHidden(
                  "Host",
                  e.target.checked
                );
              }}
            />
          </>
        }
      />
    </>
  );
}
