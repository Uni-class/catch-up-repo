"use client";
import { css } from "@/styled-system/css";
import SidebarGroup from "@/app/dashboard/_components/Sidebar/SidebarGroup";
import SidebarLink from "./SidebarLink";
import SidebarDirectory from "./SidebarDirectory";
import SidebarUser from "./SidebarUser";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";
import Button from "@/components/Button";

import LayoutIcon from "@/public/icons/layout.svg";
import CastIcon from "@/public/icons/cast.svg";
import PlusCircleIcon from "@/public/icons/plus-circle.svg";
import ExternalLinkIcon from "@/public/icons/external-link.svg"
import DatabaseIcon from "@/public/icons/database.svg";

import Image from "next/image";

import { PROJECT_NAME } from "@/const/config";

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
          <Image alt={PROJECT_NAME} src="/icon/logo.png" width={40} height={40}/>
          <Heading variant="h4">{PROJECT_NAME}</Heading>
        </div>
        <Button className={css({
          fontWeight: "bold",
        })}>세션 접속</Button>
      </div>
      <Divider/>
      <SidebarGroup name="메뉴" className={css({
          height: "100%",
      })}>
        <SidebarLink href="/dashboard"><LayoutIcon width={"1.2em"}/>대시보드</SidebarLink>
        <SidebarDirectory display={<><CastIcon width={"1.2em"}/>세션</>} href="/dashboard/session">
          <SidebarLink href="/dashboard/session/participant">내가 참가한 세션</SidebarLink>
          <SidebarLink href="/dashboard/session/host">내가 주최한 세션</SidebarLink>
          <SidebarLink href="/dashboard/session/create"><PlusCircleIcon width={"1.2em"}/>세션 생성하기</SidebarLink>
          <SidebarLink href="/dashboard/session/join"><ExternalLinkIcon width={"1.2em"}/>세션 접속하기</SidebarLink>
        </SidebarDirectory>
        <SidebarLink href="/dashboard/drive"><DatabaseIcon width={"1.2em"}/>드라이브</SidebarLink>
      </SidebarGroup>
      <Divider/>
      <SidebarUser/>
    </div>
  );
}
