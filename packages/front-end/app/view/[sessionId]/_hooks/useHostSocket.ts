import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { createTLStore, defaultShapeUtils } from "tldraw";
import { useBatchSocket } from "./useBatchSocket";

export const useHostSocket = (userId: number, roomId: number | string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { pushChanges } = useBatchSocket({ socket, userId, roomId });

  const [store] = useState(() => {
    const store = createTLStore({ shapeUtils: [...defaultShapeUtils] });
    return store;
  });

  useEffect(() => {
    setSocket(
      io(process.env.NEXT_PUBLIC_SOCKET_SERVER as string, {
        withCredentials: true,
      })
    );
    if (socket === null) return;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.emit("createRoom", { userId: userId, roomId: roomId });
    socket.on("userList", (userList: any) => {
      console.log({ userList });
    });
    store.listen(
      ({ changes }) => {
        pushChanges(changes);
      },
      { source: "user", scope: "document" }
    );
    return () => {
      socket.disconnect();
    };
  }, [pushChanges, roomId, socket, store, userId]);
  return store;
};
