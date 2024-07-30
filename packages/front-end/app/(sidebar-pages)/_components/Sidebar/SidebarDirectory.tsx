import { ReactNode } from "react";
import { useState } from "react";
import { css } from "@/styled-system/css";
import SidebarBaseElement from "@/app/(sidebar-pages)/_components/Sidebar/SidebarBaseElement";
import ChevronUpIcon from "@/public/icons/chevron-up.svg";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";
import {useRouter} from "@/hook/useRouter";

interface PropType {
  className?: string;
  display: ReactNode;
  href: string;
  children: ReactNode;
}

export default function SidebarDirectory({ className, display, href, children }: PropType) {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useRouter();
  const isSubDirectory = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className={className}>
      <SidebarBaseElement className={
        css(
          isOpen && isSubDirectory
          ?
          {
            backgroundColor: "gray.200",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "orange.100",
            },
          }
          :
          null
        )
      } active={!isOpen && isSubDirectory} onClick={() => setIsOpen(!isOpen)}>
        <p className={css({
          display: "flex",
          width: "100%",
          gap: "0.5em",
        })}>{display}</p>
        {
          isOpen
            ?
            <ChevronUpIcon width={"1.5em"}/>
            :
            <ChevronDownIcon width={"1.5em"}/>
        }
      </SidebarBaseElement>
      {
        isOpen
        ?
        <div className={css({
          display: "flex",
          flexDirection: "column",
          paddingLeft: "0.5em",
        })}>
          {children}
        </div>
        :
        null
      }
    </div>
  );
}
