import { TLRecord } from "tldraw";

type argType = Partial<TLRecord> | unknown;

export const differentialRecord = (prev: argType, next: argType): argType => {
  if (typeof prev !== "object" || prev === null) {
    return prev === next ? undefined : next;
  }

  if (Array.isArray(prev) && Array.isArray(next)) {
    if (prev.length === next.length) {
      const diff = [];
      for (let i = 0; i < prev.length; i++) {
        const value = differentialRecord(prev[i], next[i]);
        if (value !== undefined) {
          diff.push(differentialRecord(prev[i], next[i]));
        }
      }
      return diff.length > 0 ? diff : undefined;
    } else {
      return next.slice(prev.length);
    }
  }

  // 객체일 경우 객체의 차이를 반환
  if (typeof prev === "object" && typeof next === "object") {
    const difference: { [key in string | number]: unknown } = {};
    for (const key in next) {
      if (next.hasOwnProperty(key)) {
        if (!(key in prev)) {
          difference[key] = next[key as keyof typeof next]; // 새로운 key
        } else {
          const diff = differentialRecord(
            prev[key as keyof typeof prev],
            next[key as keyof typeof next]
          );
          if (typeof diff !== "undefined") {
            difference[key] = diff; // 차이가 존재하는 경우 갱신
          }
        }
      }
    }
    // undefined는 차이 없음을 의미
    // key가 존재해야 차이가 존재
    return Object.keys(difference).length > 0 ? difference : undefined;
  }

  // undefined는 차이 없음을 의미
  return undefined;
};
