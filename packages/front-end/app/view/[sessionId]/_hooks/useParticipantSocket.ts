import { useEffect, useState } from "react";
import { RecordId, TLRecord } from "tldraw";
import {
  PDFPainterController,
  PDFPainterInstanceController,
} from "@/PaintPDF/components";
import { useReceiveDrawCache } from "./useReceiveDrawCache";
import { socketAtom } from "@/client/socketAtom";
import { useAtom } from "jotai";
import { integralRecord } from "../_utils/integralRecord";

export const useParticipantSocket = (
  roomId: number | string,
  fileId: number,
  pdfPainterInstanceController: PDFPainterInstanceController,
  pdfPainterController: PDFPainterController
) => {
  const editor = pdfPainterInstanceController.getEditor();
  const {
    removeDrawCache,
    addDrawCache,
    updateDrawCache,
    setEditorFromDrawCache,
  } = useReceiveDrawCache(editor);
  const [socket] = useAtom(socketAtom);
  const pageIndex = pdfPainterController.getPageIndex();

  useEffect(() => {
    setEditorFromDrawCache(pageIndex);
  }, [pageIndex, setEditorFromDrawCache]);

  useEffect(() => {
    if (socket === null) return;   
    socket.emit("joinRoom", { roomId });
    socket.on("initUser", () => {
      console.log("Connected to WebSocket server:", socket.id);
      socket.emit("joinRoom", { roomId });
    });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    return () => {
      socket.off("connect");
      socket.off("userList");
      socket.off("initUser");
    };
  }, [roomId, socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("sendPageNumber", { roomId, fileId, index: pageIndex });
  }, [fileId, pageIndex, roomId, socket]);

  useEffect(() => {
    if (socket === null) return;

    socket.on(
      "getAddedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        pageIndex === message.index
          ? pdfPainterInstanceController.addPaintElement(message.data)
          : addDrawCache(message.index, message.data);
      }
    );
    socket.on(
      "getRemovedDraw",
      (message: { data: RecordId<any>[]; index: number }) => {
        pageIndex === message.index
          ? pdfPainterInstanceController.removePaintElement(message.data)
          : removeDrawCache(message.index, message.data);
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
            updateDrawCache(message.index, message.data);
          }
        });
      }
    );
    return () => {
      socket.off("getAddedDraw");
      socket.off("getRemovedDraw");
      socket.off("getUpdatedDraw");
    };
  }, [
    addDrawCache,
    pageIndex,
    pdfPainterInstanceController,
    removeDrawCache,
    socket,
    updateDrawCache,
  ]);
};
