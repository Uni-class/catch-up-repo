import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { useEffect } from "react";

export const useLoadDraw = (
  sessionId: number,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  useEffect(() => {
    const pageIndex = pdfPainterController.getPageIndex();
    const instanceId = pdfPainterInstanceController.getInstanceId();
    const snapshot =
      pdfPainterInstanceController.getEditorSnapshotFromStorage(pageIndex);
    pdfPainterController.currentPageEventHandler.listen(
      `${sessionId}-${fileId}-${pageIndex}`,
      () => {}
    );
  }, [fileId, pdfPainterController, pdfPainterInstanceController, sessionId]);
};
