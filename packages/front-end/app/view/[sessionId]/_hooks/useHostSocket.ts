import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  createTLStore,
  defaultShapeUtils,
  RecordsDiff,
  TLRecord,
} from "tldraw";

const isEmpty = (record: Object) => {
  return Object.keys(record).length == 0;
};

const getRecord = (changes: RecordsDiff<TLRecord>) => {
  if (!isEmpty(changes.added)) {
    return { added: Object.values(changes.added) };
  }
  if (!isEmpty(changes.removed)) {
    return { removed: Object.values(changes.removed) };
  }
  const updated = changes.updated as unknown as TLRecord[][];
  return { updated: Object.values(updated)[0][1] };
};

export const useHostSocket = () => {
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
    socket.emit("createRoom", { userId: 1, roomId: 1 });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    store.listen(
      ({ changes }) => {
        const record = getRecord(changes);
        if (isEmpty(record)) {
          return;
        }
        socket.emit("sendMessage", {
          userId: 1,
          roomId: 1,
          data: record,
        });
      },
      { source: "user", scope: "document" }
    );
    return () => {
      socket.disconnect();
    };
  }, [store]);
  return store;
};
