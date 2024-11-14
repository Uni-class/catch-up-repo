import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { apiClient } from "@/utils/axios";
import { useEffect, useRef } from "react";
import { TLEditorSnapshot } from "tldraw";

const intervalTime = 1000 * 10;

const postDraw = async ({
  sessionId,
  fileId,
  currentPageIndex,
  note,
  width,
  height,
}: {
  sessionId: number;
  fileId: number;
  currentPageIndex: number;
  note: TLEditorSnapshot | null;
  width?: number;
  height?: number;
}) => {
  if (note === null || width === undefined || height === undefined) {
    return;
  }
  apiClient.post(
    `/user/session/${sessionId}/file/${fileId}/note/${currentPageIndex}`,
    { note, width, height }
  );
};
export const usePostDraw = (
  sessionId: number,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  const editor = pdfPainterInstanceController.getEditor();
  const changedPageIndexRef = useRef<Set<number>>(new Set<number>());

  useEffect(() => {
    const currentPageIndex = pdfPainterController.getPageIndex();
    const deleteFunc = pdfPainterController.addPrevPageEventListener(
      `${sessionId}-${fileId}-${currentPageIndex}`,
      (index) => {
        const width = pdfPainterController.getPage()?.originalWidth;
        const height = pdfPainterController.getPage()?.originalHeight;
        if (changedPageIndexRef.current.has(currentPageIndex)) {
          const note =
            pdfPainterInstanceController.getEditorSnapshotFromStorage(
              currentPageIndex
            );
          postDraw({
            sessionId,
            fileId,
            currentPageIndex: index,
            note,
            width,
            height,
          });
        }
      }
    );
    // return () => {
    //   deleteFunc();
    // };
  }, [fileId, pdfPainterController, pdfPainterInstanceController, sessionId]);

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
          pdfPainterInstanceController.getEditorSnapshotFromStorage(
            currentPageIndex
          );
        postDraw({
          sessionId,
          fileId,
          currentPageIndex,
          note,
          width,
          height,
        });
      }
      changedPageIndexRef.current.clear();
    }, intervalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [fileId, pdfPainterController, pdfPainterInstanceController, sessionId]);
};
