import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  createTLStore,
  defaultShapeUtils,
  RecordId,
  RecordsDiff,
  TLRecord,
} from "tldraw";
import { differentialRecord } from "../_utils/differentialRecord";

const isEmpty = (record: { [key: string]: any }) => {
  return Object.keys(record).length == 0;
};

const getEventAndRecord = (
  changes: RecordsDiff<TLRecord>
): [
  action: "added" | "removed" | "updated",
  record: TLRecord[] | RecordId<any>[] | unknown,
] => {
  if (!isEmpty(changes.added)) {
    return ["added", Object.values(changes.added)];
  }
  if (!isEmpty(changes.removed)) {
    return ["removed", Object.values(changes.removed).map((value) => value.id)];
  }
  const updated = changes.updated as unknown as TLRecord[][];
  return [
    "updated",
    Object.values(updated).map((e) => {
      const id = e[1].id;
      const diff = differentialRecord(e[0], e[1]) as Partial<TLRecord>;
      return { ...diff, id: id };
    }),
  ];
};

export const useHostSocket = (userId: number, roomId: number | string) => {
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
    socket.emit("createRoom", { userId: userId, roomId: roomId });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    store.listen(
      ({ changes }) => {
        const [action, _record] = getEventAndRecord(changes);
        const record = _record as { [key: string]: number };
        if (isEmpty(record)) {
          return;
        }
        const messageBody = {
          index: 1,
          data: record,
          userId: userId,
          roomId: roomId,
        };
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
  }, [roomId, store, userId]);
  return store;
};
