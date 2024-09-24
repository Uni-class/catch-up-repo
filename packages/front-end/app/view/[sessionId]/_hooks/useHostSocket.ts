import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useBatchSocket } from "./useBatchSocket";
import {
  PDFPainterController,
  PDFPainterControllerHook,
  PDFPainterInstanceController,
  PDFPainterInstanceControllerHook,
} from "@/PaintPDF/components";
import { socketAtom } from "@/client/socketAtom";
import { useAtom } from "jotai";

export const useHostSocket = (
  roomId: number | string,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  const [socket] = useAtom(socketAtom);
  const pageIndex = pdfPainterController.getPageIndex();
  const { pushChanges } = useBatchSocket({ socket, roomId, pageIndex });

  const editor = pdfPainterInstanceController.getEditor();

  useEffect(() => {
    if (socket === null) return;
    if (editor === null) return;
    const { store } = editor;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.off("createRoom")
      socket.emit("createRoom", { roomId: roomId });
    });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    store.listen(
      ({ changes }) => {
        pushChanges(changes);
      },
      { source: "user", scope: "document" }
    );
  }, [editor, pushChanges, roomId, socket]);
};
