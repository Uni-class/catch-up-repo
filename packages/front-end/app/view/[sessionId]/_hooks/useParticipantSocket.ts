import { useEffect } from "react";
import { io } from "socket.io-client";
import { RecordId, TLRecord } from "tldraw";
import { integralRecord } from "../_utils/integralRecord";
import { PDFPainterInstanceControllerHook } from "@/PaintPDF/components";

export const useParticipantSocket = (
  userId: number,
  roomId: number | string,
  pdfPainterInstanceControllerHook: PDFPainterInstanceControllerHook
) => {

  const {pdfPainterInstanceController} = pdfPainterInstanceControllerHook

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.emit("joinRoom", { userId: userId, roomId: roomId });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    socket.on(
      "getAddedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        pdfPainterInstanceController.addPaintElement(message.data);
      }
    );
    socket.on(
      "getRemovedDraw",
      (message: { data: RecordId<any>[]; index: number }) => {
        pdfPainterInstanceController.removePaintElement(message.data);
      }
    );
    socket.on(
      "getUpdatedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        const updates = message.data;
        updates.forEach((update) => {
          pdfPainterInstanceController.updatePaintElementByGenerator(update.id, (record) => {
            return integralRecord(record, update);
          })
        });
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [pdfPainterInstanceController, roomId, userId]);

};
