"use client";
import { css } from "@/styled-system/css";
import SidebarMenu from "./SidebarMenu";
import SidebarUser from "./SidebarUser";
import Divider from "@/components/Divider";
import { Heading } from "@/components/Text";

import Image from "next/image";

import { PROJECT_NAME } from "@/const/config";

export default function Sidebar() {
  return (
    <div
      className={css({
        height: "100%",
        width: "14em",
        borderRight: "1px solid",
        borderColor: "gray.200",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      })}
    >
      <div className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5em",
      })}>
        <Image alt={PROJECT_NAME} src="/icon/logo.png" width={40} height={40} />
        <Heading variant="h4">{PROJECT_NAME}</Heading>
      </div>
      <button>세션 접속</button>
      <SidebarMenu />
      <Divider />
      <SidebarUser />
    </div>
  );
}
