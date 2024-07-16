import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
