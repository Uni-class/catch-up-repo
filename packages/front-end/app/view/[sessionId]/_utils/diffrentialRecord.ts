import { TLRecord } from "tldraw";

type argType = Partial<TLRecord> | unknown;

export const differentialRecord = (prev: argType, next: argType): argType => {
  // 원시값인 경우 그대로 
    if (typeof prev !== "object" || prev === null) {
    return prev === next ? undefined : next;
  }
// 배열인 경우
  if (Array.isArray(prev) && Array.isArray(next)) {
    // key: 배열 인덱스, value: 배열 엘리먼트
    const diff: { [key in number]: unknown } = {};
    for (let i = 0; i < prev.length; i++) {
      const value = differentialRecord(prev[i], next[i]);
      // 변화된 것이 있는 경우 추가
      if (value !== undefined) {
        diff[i] = value;
      }
    }
    for (let i = prev.length; i < next.length; i++) {
        // 
      diff[i] = next[i];
    }
    return Object.keys(diff).length > 0 ? diff : undefined;
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
