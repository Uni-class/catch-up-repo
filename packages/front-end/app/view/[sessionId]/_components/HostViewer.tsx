"use client";

import { useHostSocket } from "../_hooks/useHostSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";
import { ViewerPropType } from "../_types/ViewerType";
import { PreviewPages } from "./PreviewPages";
import { css } from "@/styled-system/css";

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
  useHostSocket(
    sessionId,
    fileId,
    pdfPainterHostInstanceControllerHook.pdfPainterInstanceController,
    pdfPainterControllerHook.pdfPainterController
  );

  return (
    <div
      className={css({
        display: "flex",
        width: "100vw",
        height: "100vh",
      })}
    >
      <PreviewPages
        pdfDocumentURL={pdfDocument.url}
        PDFPainterController={pdfPainterControllerHook.pdfPainterController}
        getBadgeVisible={(index) => index + 1 === 1}
        getBadgeContent={() => <>1</>}
      />
      <div
        className={css({
          justifyContent: "center",
          alignItems: "center",
          width:`calc(100% - 13rem)`,
          height:"100%",
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
  );
}
