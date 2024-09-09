import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { RecordId, TLRecord } from "tldraw";
import { integralRecord } from "../_utils/integralRecord";
import {
  PDFPainterControllerHook,
  PDFPainterInstanceControllerHook,
} from "@/PaintPDF/components";
import { useReceiveDrawCache } from "./useReceiveDrawCache";
import { socketAtom } from "@/client/socketAtom";
import { useAtom } from "jotai";

export const useParticipantSocket = (
  roomId: number | string,
  pdfPainterInstanceControllerHook: PDFPainterInstanceControllerHook,
  pdfPainterControllerHook: PDFPainterControllerHook
) => {
  const { pdfPainterController } = pdfPainterControllerHook;
  const { pdfPainterInstanceController } = pdfPainterInstanceControllerHook;
  const { removeDrawCache, addDrawCache, updateDrawCache, drawCacheRef } =
    useReceiveDrawCache();
  const [socket] = useAtom(socketAtom);
  const pageIndex = pdfPainterController.getPageIndex();
  const editor = pdfPainterInstanceController.getEditor();

  useEffect(() => {
    const pageDrawMap = drawCacheRef.current.get(pageIndex);
    console.log({ drawCache: drawCacheRef.current, pageDrawMap, pageIndex });
    if (pageDrawMap === undefined || editor === null) return;
    console.log(Array.from(pageDrawMap.values()));
    editor.store.put(
      Array.from(pageDrawMap.values()).filter((value) => {
        const record = value as { type: string } & typeof value;
        return record.type !== undefined;
      })
    );
    drawCacheRef.current.delete(pageIndex);
  }, [drawCacheRef, pageIndex, editor]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.emit("joinRoom", { roomId: roomId });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
  }, [roomId, socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.on(
      "getAddedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        console.warn("ADDED");
        pageIndex === message.index
          ? pdfPainterInstanceController.addPaintElement(message.data)
          : addDrawCache(message.index, message.data);
      }
    );
    socket.on(
      "getRemovedDraw",
      (message: { data: RecordId<any>[]; index: number }) => {
        console.warn("REMOVE");
        pageIndex === message.index
          ? pdfPainterInstanceController.removePaintElement(message.data)
          : removeDrawCache(message.index, message.data);
      }
    );
    socket.on(
      "getUpdatedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        console.warn("UPDATE");
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
  }, [
    addDrawCache,
    pageIndex,
    pdfPainterInstanceController,
    removeDrawCache,
    socket,
    updateDrawCache,
  ]);
};
