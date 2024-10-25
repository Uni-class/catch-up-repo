import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { apiClient } from "@/utils/axios";
import { useEffect, useRef } from "react";

const intervalTime = 1000 * 5;
export const usePostDraw = (
  sessionId: number,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  const editor = pdfPainterInstanceController.getEditor();
  const changedPageIndexRef = useRef<Set<number>>(new Set<number>());

  useEffect(() => {
    if (editor === null) return;
    const { store } = editor;
    const clean = store.listen(
      ({ changes }) => {
        changedPageIndexRef.current.add(pdfPainterController.getPageIndex());
      },
      { source: "user", scope: "document" }
    );

    return () => {
      store.listen(clean);
    };
  }, [editor, pdfPainterController]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentPageIndex = pdfPainterController.getPageIndex();
      const width = pdfPainterController.getPage()?.originalWidth;
      const height = pdfPainterController.getPage()?.originalHeight;
      if (changedPageIndexRef.current.has(currentPageIndex)) {
        const note =
          pdfPainterInstanceController.getEditorSnapshotFromStorage(currentPageIndex);
        if (note === null || width === undefined || height === undefined) {
          return;
        }
        apiClient.post(
          `/user/session/${sessionId}/file/${fileId}/note/${currentPageIndex}`,
          { note: note, width, height }
        );
      }
      changedPageIndexRef.current.clear();
    }, intervalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [fileId, pdfPainterController, pdfPainterInstanceController, sessionId]);
};
/**
 * TODO
 * interval time 줄이기
 * page 전환시 POST
 */
