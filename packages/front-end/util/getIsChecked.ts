import { CheckType } from "@/type/CheckType";

export function getIsChecked<K = number>(areChecked: CheckType<K>[]): K[] {
  return areChecked
    .filter((isChecked) => isChecked.checked)
    .map((isChecked) => isChecked.id);
}
