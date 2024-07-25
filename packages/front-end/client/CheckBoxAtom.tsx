import { CheckType } from "@/type/CheckType";
import { atom } from "jotai";

export const sessionIsTotalCheckedAtom = atom<boolean>(false);
export const sessionAreCheckedAtom = atom<CheckType[]>([]);

export const fileIsTotalCheckedAtom = atom<boolean>(false);
export const fileAreCheckedAtom = atom<CheckType[]>([]);
