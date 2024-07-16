import { ReactNode } from "react";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType) {
  return <><h1>오오</h1>{children}</>;
}
