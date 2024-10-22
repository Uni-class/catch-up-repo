import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { apiClient } from "@/utils/axios";
import { useCallback, useEffect, useRef } from "react";

const intervalTime = (1000 * 60 * 1) / 3;
export const usePostDraw = (
  sessionId: number,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  const editor = pdfPainterInstanceController.getEditor();
  const changedPageIndexRef = useRef<Set<number>>(new Set<number>());
  const intervalProcessRef = useRef<{ id: NodeJS.Timeout; start: number }[]>(
    []
  );

  useEffect(() => {
    if (editor === null) return;
    const { store } = editor;
    const clean = store.listen(
      ({ changes }) => {
        changedPageIndexRef.current.add(pdfPainterController.getPageIndex());
        console.log(
          "Add change page index!",
          pdfPainterController.getPageIndex()
        );
      },
      { source: "user", scope: "document" }
    );

    // return () => {
    //   store.listen(clean);
    // };
  }, [editor, pdfPainterController]);

  const sendPostRequest = useCallback(async () => {
    const width = pdfPainterController.getPage()?.originalWidth;
    const height = pdfPainterController.getPage()?.originalHeight;
    const toDeleteSet = new Set<number>();
    changedPageIndexRef.current.forEach((index) => {
      toDeleteSet.add(index);
      const note =
        pdfPainterInstanceController.getEditorSnapshotFromStorage(index);
      if (note === null || width === undefined || height === undefined) {
        return;
      }
      apiClient.post(
        `/user/session/${sessionId}/file/${fileId}/note/${index}`,
        { note: note, width, height }
      );
    });
    toDeleteSet.forEach((index) => {
      changedPageIndexRef.current.delete(index);
    });
    console.log("I delete!", changedPageIndexRef.current);
  }, [fileId, pdfPainterController, pdfPainterInstanceController, sessionId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendPostRequest();
    }, intervalTime);
    intervalProcessRef.current.push({ id: intervalId, start: Date.now() });

    return () => {
      const end = Date.now();
      const copiedIntervalProcess: { id: NodeJS.Timeout; start: number }[] = [];
      const toDelete: NodeJS.Timeout[] = [];
      intervalProcessRef.current.forEach(({ id, start }) => {
        copiedIntervalProcess.push({ id, start });
      });
      copiedIntervalProcess.forEach(({ id, start }) => {
        if (end - start > intervalTime) {
          clearInterval(id);
          toDelete.push(id);
        }
      });
      intervalProcessRef.current = intervalProcessRef.current.filter(
        ({ id }) => !toDelete.includes(id)
      );
    };
  }, [sendPostRequest]);
};
