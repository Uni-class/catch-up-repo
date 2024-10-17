export const routeTitle: Record<string, { name: string; group: string }> = {
  "/sessions/participant": { name: "내가 참가한 세션", group: "Sessions" },
  "/sessions/host": { name: "내가 주최한 세션", group: "Sessions" },
  "/sessions/create": { name: "세션 생성하기", group: "Sessions" },
  "/sessions/join": { name: "세션 접속하기", group: "Sessions" },
  "/files": { name: "강의 자료", group: "Drive" },
  "/settings": { name: "프로필", group: "Settings" },
  "/sessions/detail": { name: "세션 상세보기", group: "Sessions" },
};

export const parsePathname = (pathname:string) => {
  const split = pathname.split("/");
  // First el of split is "", because pathname starts with "/".
  if (split.length > 3) {
    split.pop();
    return split.join("/");
  } else {
    return pathname;
  }
}