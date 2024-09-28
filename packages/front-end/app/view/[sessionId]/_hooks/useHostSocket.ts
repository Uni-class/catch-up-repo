import { useEffect, useState } from "react";
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
  const [roomPageViewerCount, setRoomPageViewerCount] = useState<{
    [key in number]: number;
  }>({});
  const pageIndex = pdfPainterController.getPageIndex();
  const { pushChanges } = useBatchSocket({ socket, roomId, pageIndex, fileId });

  const editor = pdfPainterInstanceController.getEditor();

  useEffect(() => {
    if (socket === null) return;
    socket.emit("createRoom", { roomId, fileIds: [fileId] });
    socket.on("initUser", () => {
      console.log("Connected to WebSocket server:", socket.id);
      socket.emit("createRoom", { roomId, fileIds: [fileId] });
    });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    return () => {
      socket.off("connect");
      socket.off("userList");
      socket.off("initUser");
    };
  }, [fileId, roomId, socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("sendHostPageNumber", { roomId, fileId, index: pageIndex });
  }, [fileId, pageIndex, roomId, socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.on(
      "getPartiPageNumber",
      (data: { roomPageViewerCount: { [key in number]: number } }) => {
        setRoomPageViewerCount({ ...data.roomPageViewerCount });
      }
    );
    return () => {
      socket.off("getPartiPageNumber");
    };
  }, [socket]);

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

  return {roomPageViewerCount};
};
