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
import { useState } from "react";

export default function HostViewer(props: ViewerPropType) {
  const { fileList, sessionId } = props;
  const pdfDocument = fileList[0];
  const fileId = fileList[0].fileId;
  const pdfPainterControllerHook = usePDFPainterController({
    painterId: `${sessionId}_${pdfDocument.fileId}`,
  });
  const [isHideMyDraw, setIsHideMyDraw] = useState(false);
  const pdfPainterHostInstanceControllerHook = usePDFPainterInstanceController({
    editorId: "Host",
    pdfPainterController: pdfPainterControllerHook.pdfPainterController,
  });
  const { roomPageViewerCount } = useHostSocket(
    sessionId,
    fileId,
    pdfPainterHostInstanceControllerHook.pdfPainterInstanceController,
    pdfPainterControllerHook.pdfPainterController
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
          PDFPainterController={pdfPainterControllerHook.pdfPainterController}
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
        </div>
      </div>
      <PDFPainterControlBar
        pdfPainterController={pdfPainterControllerHook.pdfPainterController}
        modeComponent={
          <>
            <ModeControl
              labelText="내 필기 가리기"
              id="hide-host-draw"
              checked={pdfPainterControllerHook.pdfPainterController.getInstanceHidden(
                "Host"
              )}
              onChange={(e) => {
                pdfPainterControllerHook.pdfPainterController.setInstanceHidden(
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
