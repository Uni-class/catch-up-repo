import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  createTLStore,
  defaultShapeUtils,
  RecordId,
  RecordsDiff,
  TLRecord,
} from "tldraw";

const isEmpty = (record: { [key: string]: any }) => {
  return Object.keys(record).length == 0;
};

const getEventAndRecord = (
  changes: RecordsDiff<TLRecord>
): [
  action: "added" | "removed" | "updated",
  record: {
    added?: TLRecord[];
    removed?: RecordId<any>[];
    updated?: TLRecord;
  },
] => {
  if (!isEmpty(changes.added)) {
    return ["added", { added: Object.values(changes.added) }];
  }
  if (!isEmpty(changes.removed)) {
    return [
      "removed",
      { removed: Object.values(changes.removed).map((value) => value.id) },
    ];
  }
  const updated = changes.updated as unknown as TLRecord[][];
  return ["updated", { updated: Object.values(updated)[0][1] }];
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
        const [action, record] = getEventAndRecord(changes);
        if (isEmpty(record)) {
          return;
        }
        const messageBody = { index: 1, record, userId: 1 };
        switch (action) {
          case "added":
            socket.emit("sendAddedDraw", messageBody);
            break;
          case "removed":
            socket.emit("sendRemovedDraw", messageBody);
            break;
          case "updated":
            socket.emit("sendUpdatedDraw", messageBody);
            break;
          default:
            break;
        }
      },
      { source: "user", scope: "document" }
    );
    return () => {
      socket.disconnect();
    };
  }, [store]);
  return store;
};
