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
  // 다른 페이지 데이터 받으면 cache에 삽입됨
  // useEffect는 일단 호출되므로 내 페이지가 0인 경우에도 작동 -> cache에 삽입데이터가 반영됨?
  // 아 왜 pageIndex가 순간 message.index로 바뀌는거지?
  useEffect(() => {
    setEditorFromDrawCache(pageIndex);
  }, [pageIndex, setEditorFromDrawCache]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("joinRoom", { roomId: roomId });
    });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    return () => {
      socket.off("connect");
      socket.off("userList");
    };
  }, [roomId, socket]);

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
