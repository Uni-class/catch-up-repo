import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { createTLStore, defaultShapeUtils, RecordId, TLRecord } from "tldraw";

export const useParticipantSocket = () => {
  const [store] = useState(() => {
    const store = createTLStore({ shapeUtils: [...defaultShapeUtils] });
    return store;
  });

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.emit("joinRoom", { userId: 2, roomId: 1 });
    socket.on(
      "getAddedDraw",
      (message: { data: TLRecord[]; index: number }) => {
        store.put(message.data);
      }
    );
    socket.on(
      "getRemovedDraw",
      (message: { data: RecordId<any>[]; index: number }) => {
        store.remove(message.data);
      }
    );
    socket.on(
      "getUpdatedDraw",
      (message: { data: TLRecord; index: number }) => {
        const updated = message.data;
        store.update(updated.id, (_record) => {
          return updated;
        });
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [store]);
  return store;
};
