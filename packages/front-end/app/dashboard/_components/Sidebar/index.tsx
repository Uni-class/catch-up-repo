"use client";
import { css } from "@/styled-system/css";
import SidebarMenu from "./SidebarMenu";
import SidebarUser from "./SidebarUser";
import Divider from "@/components/Divider";

export default function Sidebar() {
  return (
    <div
      className={css({
        height: "100%",
        width: "200px",
        borderRight: "1px solid",
        borderColor: "gray.200",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <h1>캐치업</h1>
      <button>세션 접속</button>
      <p>메뉴</p>
      <SidebarMenu />
      <Divider />
      <SidebarUser />
    </div>
  );
}
