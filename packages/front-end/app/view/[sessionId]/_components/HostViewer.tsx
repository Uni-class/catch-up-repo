"use client";

import { useHostSocket } from "../_hooks/useHostSocket";
import {
  PainterInstanceGenerator,
  PDFPainter,
  usePDFPainterController,
  usePDFPainterInstanceController,
} from "@/PaintPDF/components";
import { ViewerPropType } from "../_types/ViewerType";

export default function HostViewer(props: ViewerPropType) {
  const { fileList, userId, sessionId } = props;
  const pdfDocument = fileList[0];
  const pdfPainterControllerHook = usePDFPainterController({
    painterId: `${sessionId}_${pdfDocument.fileId}`,
  });
  const pdfPainterHostInstanceControllerHook = usePDFPainterInstanceController({
    editorId: "Host",
    pdfPainterController: pdfPainterControllerHook.pdfPainterController,
  });
  useHostSocket(
    sessionId,
    pdfPainterHostInstanceControllerHook,
    pdfPainterControllerHook
  );

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
          readOnly={false}
          customPdfPainterInstanceControllerHook={
            pdfPainterHostInstanceControllerHook
          }
        />
      </PDFPainter>
    </div>
  );
}
