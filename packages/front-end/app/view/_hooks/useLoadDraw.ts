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
    pdfPainterController.currentPageEventHandler.listen(
      `${instanceId}-${pageIndex}`,
      (index) => {
            const snapshot =
              pdfPainterInstanceController.getEditorSnapshotFromStorage(
                index
              );
        if (snapshot !== null) {
          pdfPainterInstanceController.setEditorSnapshot(index, snapshot);
          return;
        }
        // TODO: api call
      }
    );
  }, [pdfPainterController, pdfPainterInstanceController]);
};
