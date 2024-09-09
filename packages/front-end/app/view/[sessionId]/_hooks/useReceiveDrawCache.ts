import { useCallback, useRef } from "react";
import { Editor, RecordId, TLRecord } from "tldraw";
import { integralRecord } from "../_utils/integralRecord";

export const useReceiveDrawCache = () => {
  const tmp = new Map(new Map<RecordId<any>, TLRecord>());
  const drawCacheRef = useRef<Map<number, Map<RecordId<any>, TLRecord>>>(
    new Map()
  );
  const removeDrawCache = useCallback(
    (pageIndex: number, ids: RecordId<any>[]) => {
      ids.forEach((id) => {
        drawCacheRef.current.get(pageIndex)?.delete(id);
      });
    },
    []
  );
  const addDrawCache = useCallback(
    (pageIndex: number, elements: TLRecord[]) => {
      elements.forEach((element) => {
        drawCacheRef.current.get(pageIndex)?.set(element.id, element);
      });
    },
    []
  );
  const updateDrawCache = useCallback(
    (pageIndex: number, elements: TLRecord[]) => {
      elements.forEach((element) => {
        const prevRecord = drawCacheRef.current.get(pageIndex)?.get(element.id);
        drawCacheRef.current
          .get(pageIndex)
          ?.set(element.id, integralRecord(prevRecord, element));
      });
    },
    []
  );
  return { removeDrawCache, addDrawCache, updateDrawCache };
};
