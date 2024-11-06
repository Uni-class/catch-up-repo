import { useRef } from "react";

export type HandlerFunction = (index: number) => void;
export type DeleteFunction = () => void;
/**
 * This is internal hook to be used in pdfPainterController.
 */
export const usePDFPainterEventHandler: () => {
  listen: (handler: HandlerFunction) => DeleteFunction;
  get: Set<HandlerFunction>;
  execute: (index:number) => void;
} = () => {
  const handlerRef = useRef<Set<HandlerFunction>>(new Set());

  return {
    listen: (handler: HandlerFunction) => {
      handlerRef.current.add(handler);
      return () => {
        handlerRef.current.delete(handler);
      };
    },
    get: handlerRef.current,
    execute: (index: number) => {
      handlerRef.current.forEach((handler) => {
        handler(index);
      });
    },
  };
};
