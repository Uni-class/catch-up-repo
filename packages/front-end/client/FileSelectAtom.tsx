import { atom } from "jotai";
import { MutableRefObject } from "react";

export const currentFormDataAtom = atom<MutableRefObject<any>>({
  current: null,
});
