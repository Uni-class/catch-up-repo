import { css } from "@/styled-system/css";
import SidebarGroup from "@/app/(sidebar-pages)/_components/Sidebar/SidebarGroup";
import SidebarLink from "./SidebarLink";
import CastIcon from "@/public/icons/cast.svg";
import DatabaseIcon from "@/public/icons/database.svg";
import { TopLogo } from "./TopLogo";

export default function Sidebar() {
  return (
    <div
      className={css({
        width: "15.15rem",
        height: "100%",
        borderRight: "1px solid",
        borderColor: "gray.200",
        bg: "primary.light",
        color: "white",
      })}
    >
      <TopLogo />
      <SidebarGroup
        name="Sessions"
        icon={<CastIcon width={"0.8125rem"} height={"0.8125rem"} />}
      >
        <SidebarLink href="/sessions/participant">내가 참가한 세션</SidebarLink>
        <SidebarLink href="/sessions/host">내가 주최한 세션</SidebarLink>
        <SidebarLink href="/sessions/create">세션 생성하기</SidebarLink>
        <SidebarLink href="/sessions/join">세션 접속하기</SidebarLink>
      </SidebarGroup>
      <SidebarGroup
        name="Drive"
        icon={<DatabaseIcon width={"0.8125rem"} height={"0.8125rem"} />}
      >
        <SidebarLink href="/files">강의 자료</SidebarLink>
      </SidebarGroup>
    </div>
  );
}
/*
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
*/
