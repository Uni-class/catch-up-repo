"use client";
import { css } from "@/styled-system/css";
import SidebarMenu from "./SidebarMenu";
import SidebarUser from "./SidebarUser";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";

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
        padding: "1rem"
      })}
    >
      <Heading variant="h4">캐치업</Heading>
      <button>세션 접속</button>
      <SidebarMenu />
      <Divider />
      <SidebarUser />
    </div>
  );
}
