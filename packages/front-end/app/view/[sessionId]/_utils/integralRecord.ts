export const integralRecord = (original: any, delta: any) => {
  // console.log({ original }, { delta });
  if (original === null || typeof original !== "object") {
    return delta; // 원시형 데이터라면 새로운 값으로 대체
  }

  if (Array.isArray(original)) {
    // delta는 key가 index고 value가 배열 element
    const _delta = delta as { [key in number]: any };
    const data = [...original]; // 원본 배열 복제
    Object.keys(_delta).forEach((e) => {
      const key = e as unknown as number;
      // 원본 배열에 있는 데이터 갱신
      if (key < original.length) {
        data[key] = integralRecord(original[key], delta[key]);
      } else {
        // 새로 추가해야하는 데이터라면
        // 보간 작업을 위한 while문(네트워크 오류로 점이 몇개 안왔을 경우)
        // while (original.length < key && original.length > 0) {
        //   data.push(data[data.length - 1]);
        // }
        data.push(_delta[key]);
      }
    });
    return data;
  }

  // 객체일 경우
  if (typeof original === "object" && typeof delta === "object") {
    const newObject = { ...original }; // 기존 값 처리
    for (const key in delta) {
      if (delta.hasOwnProperty(key)) {
        if (original.hasOwnProperty(key)) {
          // 기존에 존재하는 키라면 갈아 끼우기
          newObject[key] = integralRecord(original[key], delta[key]);
        } else {
          // 기존에 존재하지 않는 키라면 그대로
          newObject[key] = delta[key];
        }
      }
    }
    return newObject;
  }

  return delta;
};
