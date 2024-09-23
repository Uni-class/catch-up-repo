"use client";
import { MutableRefObject, useRef, useState } from "react";

export type UseFormDataResultType<T = object> = {
  unControlledDataRef: MutableRefObject<T>;
  controlledData: T;
  setControlledData: (updated: Partial<T>) => void;
};
export const useFormData = <T = object>(initialData: T) => {
  const copiedInitialData = { ...initialData };
  const unControlledDataRef = useRef(copiedInitialData);
  
  const [controlledData, _setControlledData] = useState<T>(copiedInitialData);
  const setControlledData = (updated: Partial<T>) => {
    const copiedUpdated = { ...unControlledDataRef.current, ...updated };
    _setControlledData(copiedUpdated);
    unControlledDataRef.current = copiedUpdated;
  };
  return { unControlledDataRef, controlledData, setControlledData };
};
