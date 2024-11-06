import { useRef } from "react";

export type HandlerFunction = (index: number) => void;
export type DeleteFunction = () => void;
/**
 * This is internal hook to be used in pdfPainterController.
 */
export const usePDFPainterEventHandler: () => {
  listen: (handler: HandlerFunction) => DeleteFunction;
} = () => {
  const handlerRef = useRef<Set<HandlerFunction>>(new Set());

  return {
    listen: (handler: HandlerFunction) => {
      handlerRef.current.add(handler);
      return () => {
        handlerRef.current.delete(handler);
      };
    },
  };
};
