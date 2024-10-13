"use client";

import { css } from "@/styled-system/css";
import SidebarGroup from "@/app/(sidebar-pages)/_components/Sidebar/SidebarGroup";
import SidebarLink from "./SidebarLink";
import SidebarDirectory from "./SidebarDirectory";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";
import LogoIcon from "@/public/logo-horizontal-white.svg";
import LayoutIcon from "@/public/icons/layout.svg";
import CastIcon from "@/public/icons/cast.svg";
import PlusCircleIcon from "@/public/icons/plus-circle.svg";
import ExternalLinkIcon from "@/public/icons/external-link.svg";
import DatabaseIcon from "@/public/icons/database.svg";
import { PROJECT_NAME } from "@/const/config";
import AccountOptionsViewer from "./AccountOptionsViewer";

export default function Sidebar() {
  return (
    <div
      className={css({
        width: "12.625rem",
        height: "100%",
        borderRight: "1px solid",
        borderColor: "gray.200",
        bg: "primary.light",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "4.16rem",
        })}
      >
        <LogoIcon width={"7.08rem"} height={"1.35rem"} />
      </div>
      <SidebarGroup
        name="메뉴"
        className={css({
          height: "100%",
        })}
      >
        <SidebarLink href="/dashboard">
          <LayoutIcon width={"1.2em"} />
          대시보드
        </SidebarLink>
        <SidebarDirectory
          display={
            <>
              <CastIcon width={"1.2em"} />
              세션
            </>
          }
          href="/sessions"
        >
          <SidebarLink href="/sessions/participant">
            내가 참가한 세션
          </SidebarLink>
          <SidebarLink href="/sessions/host">내가 주최한 세션</SidebarLink>
          <SidebarLink href="/sessions/create">
            <PlusCircleIcon width={"1.2em"} />
            세션 생성하기
          </SidebarLink>
          <SidebarLink href="/sessions/join">
            <ExternalLinkIcon width={"1.2em"} />
            세션 접속하기
          </SidebarLink>
        </SidebarDirectory>
        <SidebarLink href="/files">
          <DatabaseIcon width={"1.2em"} />
          드라이브
        </SidebarLink>
      </SidebarGroup>
      <Divider />
      <AccountOptionsViewer />
    </div>
  );
}
