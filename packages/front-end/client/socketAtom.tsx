import { Socket } from "socket.io-client";
import { atom } from "jotai";

export const socketAtom = atom<null | Socket>(null);
