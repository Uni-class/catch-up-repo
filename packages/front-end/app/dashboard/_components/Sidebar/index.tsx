"use client";
import { css } from "@/styled-system/css";
import SidebarGroup from "@/app/dashboard/_components/Sidebar/SidebarGroup";
import SidebarLink from "./SidebarLink";
import SidebarDirectory from "./SidebarDirectory";
import SidebarUser from "./SidebarUser";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";
import Button from "@/components/Button";

import Image from "next/image";

import { PROJECT_NAME } from "@/const/config";

export default function Sidebar() {
  return (
    <div
      className={css({
        display: "flex",
        padding: "1em",
        width: "14em",
        height: "100%",
        borderRight: "1px solid",
        borderColor: "gray.200",
        flexDirection: "column",
      })}
    >
        <div className={css({
          display: "flex",
          marginBottom: "0.5em",
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
          <SidebarLink name="대시보드" href="/dashboard" />
          <SidebarDirectory name="세션" href="/dashboard/session">
            <SidebarLink name="내가 참가한 세션" href="/dashboard/session/participant" />
            <SidebarLink name="내가 주최한 세션" href="/dashboard/session/host" />
            <SidebarLink name="세션 생성하기" href="/dashboard/session/create" />
          </SidebarDirectory>
          <SidebarLink name="드라이브" href="/dashboard/drive" />
        </SidebarGroup>
        <Divider/>
        <SidebarUser/>
    </div>
  );
}
