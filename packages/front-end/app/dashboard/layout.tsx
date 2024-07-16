import { ReactNode } from "react";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType) {
  return <>{children}</>;
}
