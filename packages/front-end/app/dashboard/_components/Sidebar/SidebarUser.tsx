import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import SidebarUserSwitch from "./SidebarUserSwitch";
import SidebarMenuGroup from "./SidebarMenuGroup";
import Link from "next/link";

export default function SidebarUser() {
  return (
    <>
      <SidebarMenuGroup>
        <Link
          href="/dashboard/user-menu"
          className={css({
            display: "block",
            padding: "0.8em",
            borderRadius: "8px",
            cursor: "pointer",
            "&:hover": {
              bg: "gray.100",
            },
            transition: "background 0.2s",
          })}
        >
          USER NAME [강의자]
        </Link>
      </SidebarMenuGroup>
      <SidebarMenuGroup>
        <SidebarUserSwitch />
      </SidebarMenuGroup>
    </>
  );
}
