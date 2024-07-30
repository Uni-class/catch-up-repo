import { CheckType } from "@/type/CheckType";
import { atom } from "jotai";

export const fileIsTotalCheckedAtom = atom<boolean>(false);
export const fileAreCheckedAtom = atom<CheckType[]>([]);
