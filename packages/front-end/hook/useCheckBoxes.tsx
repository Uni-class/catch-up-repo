import { useEffect, useState } from "react";

// typeof T: data element, typeof K: typeof data's id
// data: data to make checkbox Arr, id: data's property that roles id
export function useCheckBoxes<T, K = number>({
  data,
  id,
  initValue = false,
}: {
  data: T[];
  id: keyof T;
  initValue: boolean;
}) {
  type CheckType = { id: K; checked: boolean };
  const [areChecked, setAreChecked] = useState<CheckType[]>([]);
  const [isTotalChecked, setIsTotalChecked] = useState(initValue);
  useEffect(() => {
    if (data) {
      setAreChecked(
        data.map(
          (item) => ({ id: item[id], checked: isTotalChecked }) as CheckType
        )
      );
    }
  }, [data]);
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
