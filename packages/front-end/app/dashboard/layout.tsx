import { css } from "@/styled-system/css";
import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

interface PropType {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: PropType) {
  return (
    <>
      <main className={css({ display: "flex", height: "100vh" })}>
        <Sidebar />
        {children}
      </main>
      {modal}
    </>
  );
}
