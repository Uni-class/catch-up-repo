import { atom } from "jotai";
import { MutableRefObject } from "react";

export const currentFormDataRefAtom = atom<MutableRefObject<any>>({
  current: null,
});
