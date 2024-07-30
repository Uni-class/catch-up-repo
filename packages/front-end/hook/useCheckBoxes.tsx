import { SetStateAction, useEffect } from "react";
import { useRouter } from "./useRouter";
import { CheckType } from "@/type/CheckType";
import { PrimitiveAtom, useAtom } from "jotai";
import { SetAtom } from "@/type/JotaiType";
import { getIsChecked as _getIsChecked } from "@/util/getIsChecked";

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
  isTotalCheckedAtom,
  areCheckedAtom,
}: {
  data: T[];
  id: keyof T;
  initValue?: boolean;
  isTotalCheckedAtom: PrimitiveAtom<boolean>;
  areCheckedAtom: PrimitiveAtom<CheckType<K>[]>;
}): {
  areChecked: CheckType<K>[];
  setAreChecked: SetAtom<[SetStateAction<CheckType<K>[]>], void>;
  isTotalChecked: boolean;
  setIsTotalChecked: SetAtom<[SetStateAction<boolean>], void>;
  setIsCheckedOne: (id: K, value: boolean) => void;
  isCheckedOne: (id: K) => boolean;
  getIsChecked: K[];
} {
  const [areChecked, setAreChecked] = useAtom(areCheckedAtom);
  const [isTotalChecked, setIsTotalChecked] = useAtom(isTotalCheckedAtom);
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
  const getIsChecked = _getIsChecked(areChecked);
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
