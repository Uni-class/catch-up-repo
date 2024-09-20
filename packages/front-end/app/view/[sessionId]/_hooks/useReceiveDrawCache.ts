import { useCallback, useRef } from "react";
import { Editor, RecordId, TLRecord } from "tldraw";
import { integralRecord } from "../_utils/integralRecord";

export const useReceiveDrawCache = (editor: Editor | null) => {
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
        drawCacheRef.current
          .get(pageIndex)
          ?.set(element.id, integralRecord(prevRecord, element));
      });
    },
    []
  );
  const setEditorFromDrawCache = useCallback(
    (pageIndex: number) => {
      const pageDrawMap = drawCacheRef.current.get(pageIndex);
      if (pageDrawMap === undefined || editor === null) return;
      // editor관련 코드가 pageIndex를 순회하진 않음
      editor.store.put(
        Array.from(pageDrawMap.values())
          .map((value) => {
            const record = value as { type: string | undefined } & typeof value;
            if (record.type === undefined) {
              const recordFromEditor = editor.store.get(value.id);
              if (recordFromEditor !== undefined) {
                console.warn(
                  "WEIRD RECORD! but don't worry. It will works well...maybe",
                  {
                    record: integralRecord(recordFromEditor, value),
                  }
                );
                return integralRecord(recordFromEditor, value);
              } else {
                console.error(
                  "WEIRD RECORD! I can't find original from editor ID:",
                  value.id
                );
                return null;
              }
            } else {
              return record;
            }
          })
          .filter((value) => value !== null)
      );
      drawCacheRef.current.delete(pageIndex);
    },
    [editor]
  );

  return {
    removeDrawCache,
    addDrawCache,
    updateDrawCache,
    drawCacheRef,
    setEditorFromDrawCache,
  };
};
