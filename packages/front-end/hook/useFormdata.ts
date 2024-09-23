"use client";
import { useRef, useState } from "react";

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
