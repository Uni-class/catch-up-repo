"use client";

import { css } from "@/styled-system/css";
import SidebarGroup from "@/app/(sidebar-pages)/_components/Sidebar/SidebarGroup";
import SidebarLink from "./SidebarLink";
import SidebarDirectory from "./SidebarDirectory";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";
import LinkButton from "@/components/LinkButton";

import LayoutIcon from "@/public/icons/layout.svg";
import CastIcon from "@/public/icons/cast.svg";
import PlusCircleIcon from "@/public/icons/plus-circle.svg";
import ExternalLinkIcon from "@/public/icons/external-link.svg"
import DatabaseIcon from "@/public/icons/database.svg";
import Image from "next/image";
import { PROJECT_NAME } from "@/const/config";
import SidebarUserFetch from "./SidebarUser";

export default function Sidebar() {

  return (
    <div
      className={css({
        display: "flex",
        padding: "0.5em",
        width: "14em",
        height: "100%",
        borderRight: "1px solid",
        borderColor: "gray.200",
        flexDirection: "column",
      })}
    >
      <div className={css({
        display: "flex",
        margin: "1em 0",
        flexDirection: "column",
        gap: "1em",
      })}>
        <div className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5em",
        })}>
          <Heading variant="h4">{PROJECT_NAME}</Heading>
        </div>
      </div>
      <Divider/>
      <SidebarGroup name="메뉴" className={css({
          height: "100%",
      })}>
        <SidebarLink href="/dashboard"><LayoutIcon width={"1.2em"}/>대시보드</SidebarLink>
        <SidebarDirectory display={<><CastIcon width={"1.2em"}/>세션</>} href="/sessions">
          <SidebarLink href="/sessions/participant">내가 참가한 세션</SidebarLink>
          <SidebarLink href="/sessions/host">내가 주최한 세션</SidebarLink>
          <SidebarLink href="/sessions/create"><PlusCircleIcon width={"1.2em"}/>세션 생성하기</SidebarLink>
          <SidebarLink href="/sessions/join"><ExternalLinkIcon width={"1.2em"}/>세션 접속하기</SidebarLink>
        </SidebarDirectory>
        <SidebarLink href="/files"><DatabaseIcon width={"1.2em"}/>드라이브</SidebarLink>
      </SidebarGroup>
      <Divider/>
      <SidebarUserFetch/>
    </div>
  );
}
