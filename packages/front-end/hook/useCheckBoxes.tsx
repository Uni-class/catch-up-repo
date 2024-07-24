import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "./useRouter";

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
}): {
  areChecked: CheckType<K>[];
  setAreChecked: Dispatch<SetStateAction<CheckType<K>[]>>;
  isTotalChecked: boolean;
  setIsTotalChecked: Dispatch<SetStateAction<boolean>>;
  setIsCheckedOne: (id: K, value: boolean) => void;
  isCheckedOne: (id: K) => boolean;
  getIsChecked: () => {
    id: K;
  }[];
} {
  const [areChecked, setAreChecked] = useState<CheckType<K>[]>([]);
  const [isTotalChecked, setIsTotalChecked] = useState(initValue);
  const { pathname, query } = useRouter();
  useEffect(() => {
    if (data) {
      setAreChecked(
        data.map(
          (item) => ({ id: item[id], checked: isTotalChecked }) as CheckType<K>
        )
      );
    }
  }, [data, isTotalChecked]);
  useEffect(() => {
    setIsTotalChecked(initValue);
  }, [pathname, query]);
  const setIsCheckedOne = (id: K, value: boolean) => {
    setAreChecked(
      areChecked.map((isChecked) =>
        isChecked.id === id ? { id: isChecked.id, checked: value } : isChecked
      )
    );
  };
  const isCheckedOne = (id: K) =>
    areChecked.find((e) => e.id === id)?.checked ?? initValue;
  const getIsChecked = (): { id: K }[] =>
    areChecked
      .filter((isChecked) => isChecked.checked)
      .map((isChecked) => ({
        id: isChecked.id,
      }));
  return {
    areChecked,
    setAreChecked,
    isTotalChecked,
    setIsTotalChecked,
    setIsCheckedOne,
    isCheckedOne,
    getIsChecked,
  };
}
