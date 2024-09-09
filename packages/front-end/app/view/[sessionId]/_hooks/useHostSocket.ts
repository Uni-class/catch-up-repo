import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useBatchSocket } from "./useBatchSocket";
import {
  PDFPainterControllerHook,
  PDFPainterInstanceControllerHook,
} from "@/PaintPDF/components";

export const useHostSocket = (
  userId: number,
  roomId: number | string,
  pdfPainterInstanceControllerHook: PDFPainterInstanceControllerHook,
  pdfPainterControllerHook: PDFPainterControllerHook
) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { pdfPainterController } = pdfPainterControllerHook;
  const { pdfPainterInstanceController } = pdfPainterInstanceControllerHook;
  const pageIndex = pdfPainterController.getPageIndex();
  const { pushChanges } = useBatchSocket({ socket, userId, roomId, pageIndex });

  const editor = pdfPainterInstanceController.getEditor();

  useEffect(() => {
    setSocket(
      io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
        withCredentials: true,
      })
    );
  }, []);

  useEffect(() => {
    if (socket === null) return;
    if (editor === null) return;
    const { store } = editor;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.emit("createRoom", { roomId: roomId });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    store.listen(
      ({ changes }) => {
        pushChanges(changes);
      },
      { source: "user", scope: "document" }
    );
    return () => {
      socket.disconnect();
    };
  }, [editor, pushChanges, roomId, socket, userId]);
};
