"use client";
import { MutableRefObject, useRef, useState } from "react";
import { v4 } from "uuid";

export type UseFormDataResultType<T = object> = {
  unControlledDataRef: MutableRefObject<T>;
  controlledData: T;
  setControlledData: (updated: Partial<T>) => void;
  idRef: MutableRefObject<string>;
};
export const useFormData = <T = object>(initialData: T) => {
  const copiedInitialData = { ...initialData };
  const unControlledDataRef = useRef(copiedInitialData);
  const idRef = useRef(v4());

  const [controlledData, _setControlledData] = useState<T>(copiedInitialData);
  const setControlledData = (updated: Partial<T>) => {
    const copiedUpdated = { ...unControlledDataRef.current, ...updated };
    _setControlledData(copiedUpdated);
    unControlledDataRef.current = copiedUpdated;
  };
  return { unControlledDataRef, controlledData, setControlledData, idRef };
};
