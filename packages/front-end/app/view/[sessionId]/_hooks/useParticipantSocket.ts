import { useEffect } from "react";
import { io } from "socket.io-client";
import { RecordId, TLRecord } from "tldraw";
import { integralRecord } from "../_utils/integralRecord";
import {
  PDFPainterControllerHook,
  PDFPainterInstanceControllerHook,
} from "@/PaintPDF/components";
import { useReceiveDrawCache } from "./useReceiveDrawCache";

export const useParticipantSocket = (
  userId: number,
  roomId: number | string,
  pdfPainterInstanceControllerHook: PDFPainterInstanceControllerHook,
  pdfPainterControllerHook: PDFPainterControllerHook
) => {
  const { pdfPainterController } = pdfPainterControllerHook;
  const { pdfPainterInstanceController } = pdfPainterInstanceControllerHook;
  const { removeDrawCache, addDrawCache, updateDrawCache } =
    useReceiveDrawCache();
  const pageIndex = pdfPainterController.getPageIndex();

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
        pageIndex === message.index
          ? pdfPainterInstanceController.addPaintElement(message.data)
          : addDrawCache(pageIndex, message.data);
      }
    );
    socket.on(
      "getRemovedDraw",
      (message: { data: RecordId<any>[]; index: number }) => {
        pageIndex === message.index
          ? pdfPainterInstanceController.removePaintElement(message.data)
          : removeDrawCache(pageIndex, message.data);
      }
    );
    socket.on(
      "getUpdatedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        const updates = message.data;
        updates.forEach((update) => {
          if (pageIndex === message.index) {
            pdfPainterInstanceController.updatePaintElementByGenerator(
              update.id,
              (record) => {
                return integralRecord(record, update);
              }
            );
          } else {
            updateDrawCache(pageIndex, message.data);
          }
        });
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [
    addDrawCache,
    pageIndex,
    pdfPainterInstanceController,
    removeDrawCache,
    roomId,
    updateDrawCache,
    userId,
  ]);
};
