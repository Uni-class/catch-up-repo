import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<h1>페이지 로딩...</h1>}>{children}</Suspense>;
}
