import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { useEffect } from "react";
import { TLEditorSnapshot } from "tldraw";
import { GetDrawType } from "../_utils/drawAPIUtils";

export const useLoadDraw = (
  sessionId: number,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController,
  apiCallback: GetDrawType,
) => {
  useEffect(() => {
    const pageIndex = pdfPainterController.getPageIndex();
    const instanceId = pdfPainterInstanceController.getInstanceId();
    pdfPainterController.currentPageEventHandler.listen(
      `${instanceId}-${pageIndex}`,
      async (index) => {
        const snapshot =
          pdfPainterInstanceController.getEditorSnapshotFromStorage(index);
        if (snapshot !== null) {
          pdfPainterInstanceController.setEditorSnapshot(index, snapshot);
          return;
        }
        const note = await apiCallback({
          sessionId,
          fileId,
          currentPageIndex: index,
        }).then((res) => res.note);
        if (note === null) return;
        pdfPainterInstanceController.setEditorSnapshot(index, note);
      }
    );
  }, [
    apiCallback,
    fileId,
    pdfPainterController,
    pdfPainterInstanceController,
    sessionId,
  ]);
};
