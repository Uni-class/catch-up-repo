import { useCallback, useRef } from "react";
import { Editor, RecordId, TLRecord } from "tldraw";
import { integralRecord } from "../_utils/integralRecord";

export const useReceiveDrawCache = () => {
  const drawCacheRef = useRef<Map<number, Map<RecordId<any>, TLRecord>>>(
    new Map()
  );
  const initCachePageIndex = (pageIndex: number) => {
    if (drawCacheRef.current.get(pageIndex) === undefined) {
      drawCacheRef.current.set(pageIndex, new Map());
    }
  };
  const removeDrawCache = useCallback(
    (pageIndex: number, ids: RecordId<any>[]) => {
      initCachePageIndex(pageIndex);
      ids.forEach((id) => {
        drawCacheRef.current.get(pageIndex)?.delete(id);
      });
    },
    []
  );
  const addDrawCache = useCallback(
    (pageIndex: number, elements: TLRecord[]) => {
      initCachePageIndex(pageIndex);
      elements.forEach((element) => {
        drawCacheRef.current.get(pageIndex)?.set(element.id, element);
      });
    },
    []
  );
  const updateDrawCache = useCallback(
    (pageIndex: number, elements: TLRecord[]) => {
      initCachePageIndex(pageIndex);
      elements.forEach((element) => {
        const prevRecord = drawCacheRef.current.get(pageIndex)?.get(element.id);
        if (prevRecord === undefined) {
          console.log(
            `${pageIndex} 페이지에서 이 그리기:${element.id} 처리 불가`,
            drawCacheRef.current.get(pageIndex)?.get(element.id),
            drawCacheRef.current.get(pageIndex)
          );
        }
        drawCacheRef.current
          .get(pageIndex)
          ?.set(element.id, integralRecord(prevRecord, element));
      });
    },
    []
  );
  return { removeDrawCache, addDrawCache, updateDrawCache, drawCacheRef };
};
