import { ReactNode } from "react";
import OptionHeader from "./_components/OptionHeader";
import { css } from "@/styled-system/css";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType) {
  return (
    <div className={css({ flexGrow: 1,paddingX:"1rem" })}>
      <OptionHeader />
      {children}
    </div>
  );
}
