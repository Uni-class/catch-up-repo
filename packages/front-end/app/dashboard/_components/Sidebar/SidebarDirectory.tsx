import { ReactNode } from "react";
import { useState } from "react";
import { css } from "@/styled-system/css";
import SidebarBaseElement from "@/app/dashboard/_components/Sidebar/SidebarBaseElement";
import ChevronUpIcon from "@/public/icons/chevron-up.svg";
import ChevronDownIcon from "/public/icons/chevron-down.svg";
import {useRouter} from "@/hook/useRouter";

interface PropType {
  className?: string;
  name: string;
  href: string;
  children: ReactNode;
}

export default function SidebarDirectory({ className, name, href, children }: PropType) {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useRouter();

  return (
    <div className={className}>
      {name === "" ? undefined : (
        <SidebarBaseElement className={
          css(
            isOpen && pathname.startsWith(href)
            ?
            {
              color: "#ffffff",
              backgroundColor: "orange.300",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "orange.200",
              },
              "&:active": {
                color: "#000000",
                backgroundColor: "gray.200",
              }
            }
            :
            null
          )
        } active={!isOpen && pathname.startsWith(href)} onClick={() => setIsOpen(!isOpen)}>
          <div className={css({
            display: "flex",
            justifyContent: "space-between",
          })}>
            <p>{name}</p>
            {
              isOpen
              ?
                <ChevronUpIcon/>
                :
                <ChevronDownIcon/>
            }
          </div>
        </SidebarBaseElement>
      )}
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
