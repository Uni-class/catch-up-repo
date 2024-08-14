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
      "getData",
      (message: {
        data: {
          added?: TLRecord[];
          updated?: TLRecord;
          removed?: TLRecord[];
        };
      }) => {
        const { added, updated, removed } = message.data;
        if (added) {
            console.log(added);
          store.put(added);
        } else if (updated) {
          store.update(updated.id, (_record) => {
            return updated;
          });
        } else if (removed) {
          store.remove(removed.map((e) => e.id));
        }
      }
    );
    return () => {
      socket.disconnect();
    };
  }, [store]);
  return store;
};
