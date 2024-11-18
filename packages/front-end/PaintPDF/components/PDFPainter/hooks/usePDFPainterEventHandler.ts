import { useRef } from "react";

export type HandlerFunction = (index: number) => Promise<void>;
export type DeleteFunction = () => void;

export interface PDFPainterEventHandlerReturn {
  listen: (key: string, handler: HandlerFunction) => DeleteFunction;
  get: (key: string) => HandlerFunction | undefined;
  executeAll: (index: number) => Promise<void>;
  clear: () => void;
  delete: (key: string) => void;
}
/**
 * This is internal hook to be used in pdfPainterController.
 */
export const usePDFPainterEventHandler: () => PDFPainterEventHandlerReturn = () => {
  const handlerRef = useRef<Map<string, HandlerFunction>>(new Map());

  return {
    listen: (key, handler: HandlerFunction) => {
      handlerRef.current.set(key, handler);
      return () => {
        handlerRef.current.delete(key);
      };
    },
    get: (key) => handlerRef.current.get(key),
    executeAll: async (index: number) => {
      const promises:Promise<void>[] = []
      for (const handler of handlerRef.current.values()) {
        promises.push(handler(index));
      }
      await Promise.allSettled(promises)
    },
    clear: () => {
      handlerRef.current.clear();
    },
    delete: (key) => {
      handlerRef.current.delete(key);
    },
  };
};
