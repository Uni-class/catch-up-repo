import { useEffect, useState } from "react";

/**
 * Generic type representing a checkbox state.
 * @template K - The type of the id.
 */
export type CheckType<K> = { id: K; checked: boolean };
/**
 * Custom hook for managing checkboxes.
 *
 * @template T - The type of the data elements.
 * @template K - The type of the data's id property.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {T[]} params.data - The data to create the checkbox array from.
 * @param {keyof T} params.id - The property of the data that acts as the id.
 * @param {boolean} [params.initValue=false] - The initial value for the checkboxes.
 *
 * @returns {Object} The state and functions for managing the checkboxes.
 */
export function useCheckBoxes<T, K = number>({
  data,
  id,
  initValue = false,
}: {
  data: T[];
  id: keyof T;
  initValue?: boolean;
}): object {
  const [areChecked, setAreChecked] = useState<CheckType<K>[]>([]);
  const [isTotalChecked, setIsTotalChecked] = useState(initValue);
  useEffect(() => {
    if (data) {
      setAreChecked(
        data.map(
          (item) => ({ id: item[id], checked: isTotalChecked }) as CheckType<K>
        )
      );
    }
  }, [data, isTotalChecked]);
  const setCheckOne = (id: K, value: boolean) => {
    setAreChecked(
      areChecked.map((areCheck) =>
        areCheck.id === id ? { id: areCheck.id, checked: value } : areCheck
      )
    );
  };
  return {
    areChecked,
    setAreChecked,
    isTotalChecked,
    setIsTotalChecked,
    setCheckOne,
  };
}
