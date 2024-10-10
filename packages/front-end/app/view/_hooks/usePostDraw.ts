import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { apiClient } from "@/utils/axios";
import { useEffect, useRef } from "react";

const intervalTime = (1000 * 60 * 1) / 6;
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

    store.listen(
      ({ changes }) => {
        changedPageIndexRef.current.add(pdfPainterController.getPageIndex());
      },
      { source: "user", scope: "document" }
    );
  }, [editor, pdfPainterController]);

  useEffect(() => {
    const sendPostRequest = async () => {
      const tempPageSet = new Set<number>();
      changedPageIndexRef.current.forEach((index) => {
        tempPageSet.add(index);
      });
      tempPageSet.forEach((index) => {
        const note =
          pdfPainterInstanceController.getEditorSnapshotFromStorage(index);
        if (note === null) {
          return;
        }
        apiClient.post(
          `/user/session/${sessionId}/file/${fileId}/note/${index}`,
          note
        );
        changedPageIndexRef.current.delete(index);
      });
    };

    const intervalId = setInterval(() => {
      sendPostRequest();
    }, intervalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [fileId, pdfPainterInstanceController, sessionId]);
};
