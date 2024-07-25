import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import SidebarUserSwitch from "./SidebarUserSwitch";
import SidebarMenuGroup from "./SidebarMenuGroup";
import Link from "next/link";

export default function SidebarUser() {
  return (
    <>
      <SidebarMenuGroup>
        <div
          className={css({
            padding: "0.8em",
            borderRadius: "8px",
            cursor: "pointer",
            "&:hover": {
              bg: "gray.200",
            },
          })}
        >
          <Link href="/dashboard/user-menu">USER NAME [강의자]</Link>
        </div>
      </SidebarMenuGroup>
      <SidebarMenuGroup>
        <SidebarUserSwitch />
      </SidebarMenuGroup>
    </>
  );
}
