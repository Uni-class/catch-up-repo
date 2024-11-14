import { useRef } from "react";

export type HandlerFunction = (index: number) => void;
export type DeleteFunction = () => void;

export interface PDFPainterEventHandlerReturn {
  listen: (key: string, handler: HandlerFunction) => DeleteFunction;
  get: (key: string) => HandlerFunction | undefined;
  executeAll: (index: number) => void;
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
    executeAll: (index: number) => {
      console.log("execute", index, handlerRef.current);
      for (const handler of handlerRef.current.values()) {
        handler(index);
      }
    },
    clear: () => {
      handlerRef.current.clear();
    },
    delete: (key) => {
      handlerRef.current.delete(key);
    },
  };
};
