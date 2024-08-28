import { useCallback, useEffect, useRef } from "react";
import { RecordId, RecordsDiff, TLRecord } from "tldraw";
import { differentialRecord } from "../_utils/differentialRecord";
import { Socket } from "socket.io-client";

type ElementType = {
  type: "added" | "updated" | "removed";
  data: TLRecord | [TLRecord, TLRecord];
};

const INTERVAL_TIME = 50; // fps = 1000 / INTERVAL_TIME
/**
 *    ## 가정
 *    - added -> updated -> removed는 순서가 보장
 *    - 큐에서 added는 0번째만 가능, removed는 마지막만 가능
 *    - 모든 tldraw 필기의 id는 유일하다는 가정 (removed element id === 새로 그렸을떄(added + updated) element id)인 경우 없음
 *
 *    ## 큐 데이터 처리
 *    - 큐에 add가 포함된 경우: update까지 added에 포함([last][1]을 added이벤트로)
 *    - updated만 있는 경우: 배열 [0][0] & 배열 [last][1] 압축
 *    - remove가 포함된 경우: 다 비우고 추가 안함
 *
 *    ## 시간 트리거
 *    - removed면 id배열에 id추가해 removed 이벤트
 *    - added만 있거나 added가 포함된 경우 added 이벤트
 *    - updated만 있는 경우 updated 이벤트
 *    - 빈 큐의 id(key) 삭제
 */
export const useBatchSocket = ({
  socket,
  userId,
  roomId,
}: {
  socket: Socket | null;
  userId: number;
  roomId: number | string;
}) => {
  const queueRef = useRef<{
    [key in RecordId<any>]: ElementType[];
  }>({});
  // push Element to queueRef Array
  const pushArray = (key: string, element: ElementType) => {
    const recordId = key as RecordId<any>;
    if (
      !queueRef.current.hasOwnProperty(recordId) ||
      queueRef.current[recordId].length === 0
    ) {
      queueRef.current[recordId] = [element];
    } else {
      queueRef.current[recordId].push(element);
    }
  };
  const pushChanges = useCallback((changes: RecordsDiff<TLRecord>) => {
    Object.keys(changes.added).forEach((e) => {
      pushArray(e, { type: "added", data: changes.added[e as RecordId<any>] });
    });
    Object.keys(changes.removed).forEach((e) => {
      pushArray(e, {
        type: "removed",
        data: changes.removed[e as RecordId<any>],
      });
    });
    Object.keys(changes.updated).forEach((e) => {
      pushArray(e, {
        type: "updated",
        data: changes.updated[e as RecordId<any>],
      });
    });
  }, []);

  // get condition
  const toRemove = (id: RecordId<any>) => {
    return (
      queueRef.current[id][queueRef.current[id].length - 1].type === "removed"
    );
  };
  const toAddOnly = (id: RecordId<any>) => {
    return (
      queueRef.current[id][0].type === "added" &&
      queueRef.current[id].length === 1
    );
  };
  const toAddConcat = (id: RecordId<any>) => {
    return (
      queueRef.current[id][0].type === "added" &&
      queueRef.current[id].length > 1
    );
  };
  const toUpdate = (id: RecordId<any>) => {
    return (
      queueRef.current[id][0].type === "updated" &&
      queueRef.current[id][queueRef.current[id].length - 1].type === "updated"
    );
  };

  // process data & format data to send
  const processBatchQueue = useCallback(() => {
    const dataFormat: {
      added: TLRecord[];
      updated: any[];
      removed: RecordId<any>[];
    } = {
      added: [],
      updated: [],
      removed: [],
    };

    // process data
    Object.keys(queueRef.current).forEach((e) => {
      const recordId = e as RecordId<any>;
      if (toRemove(recordId)) {
        dataFormat.removed.push(recordId);
      } else if (toAddOnly(recordId)) {
        const addedResult = queueRef.current[recordId][0].data as TLRecord;
        dataFormat.added.push(addedResult);
      } else if (toAddConcat(recordId)) {
        const updatedResult = queueRef.current[recordId][
          queueRef.current[recordId].length - 1
        ].data as [TLRecord, TLRecord];
        dataFormat.added.push(updatedResult[1]);
      } else if (toUpdate(recordId)) {
        const firstResult = queueRef.current[recordId][0].data as [
          TLRecord,
          TLRecord,
        ];
        const lastResult = queueRef.current[recordId][
          queueRef.current[recordId].length - 1
        ].data as [TLRecord, TLRecord];
        const diff = differentialRecord(
          firstResult[0],
          lastResult[1]
        ) as Partial<TLRecord>;
        dataFormat.updated.push({ ...diff, id: recordId });
      }
    });

    // manage obj mem
    Object.keys(queueRef.current).forEach((e) => {
      const recordId = e as RecordId<any>;
      delete queueRef.current[recordId];
    });
    return dataFormat;
  }, []);

  // process data & send at intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (socket === null) return;
      const dataFormat = processBatchQueue();
      const messageBody = {
        index: 1,
        userId: userId,
        roomId: roomId,
      };
      if (dataFormat.added.length > 0) {
        socket.emit("sendAddedDraw", {
          ...messageBody,
          data: dataFormat.added,
        });
      }
      if (dataFormat.removed.length > 0) {
        socket.emit("sendRemovedDraw", {
          ...messageBody,
          data: dataFormat.removed,
        });
      }
      if (dataFormat.updated.length > 0) {
        socket.emit("sendUpdatedDraw", {
          ...messageBody,
          data: dataFormat.updated,
        });
      }
    }, INTERVAL_TIME);

    return () => {
      clearInterval(intervalId);
    };
  }, [processBatchQueue, roomId, socket, userId]);
  return { queueRef, pushChanges };
};
