import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { useEffect } from "react";
import { TLEditorSnapshot } from "tldraw";

export const useLoadDraw = (
  sessionId: number,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController,
  apiCallback: ({
    sessionId,
    fileId,
    currentPageIndex,
  }: {
    sessionId: number;
    fileId: number;
    currentPageIndex: number;
  }) => Promise<{
    note: TLEditorSnapshot | null;
    width: number;
    height: number;
  }>
) => {
  useEffect(() => {
    pdfPainterController.currentPageEventHandler.clear();
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
