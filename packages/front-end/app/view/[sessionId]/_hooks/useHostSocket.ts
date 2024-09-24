import { useEffect } from "react";
import { useBatchSocket } from "./useBatchSocket";
import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { socketAtom } from "@/client/socketAtom";
import { useAtom } from "jotai";

export const useHostSocket = (
  roomId: number | string,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  const [socket] = useAtom(socketAtom);
  const pageIndex = pdfPainterController.getPageIndex();
  const { pushChanges } = useBatchSocket({ socket, roomId, pageIndex,fileId });

  const editor = pdfPainterInstanceController.getEditor();

  useEffect(() => {
    if (socket === null) return;
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("createRoom", { roomId, fileId });
    });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    return () => {
      socket.off("connect");
      socket.off("userList");
    };
  }, [fileId, roomId, socket]);

  useEffect(() => {
    if (socket === null) return;
    if (editor === null) return;
    const { store } = editor;

    store.listen(
      ({ changes }) => {
        pushChanges(changes);
      },
      { source: "user", scope: "document" }
    );
  }, [editor, pushChanges, socket]);
};
