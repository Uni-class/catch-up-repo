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
            width: "100%",
            height: "100%",
            display: "block",
            padding: "0.8em",
            borderRadius: "8px",
            cursor: "pointer",
            "&:hover": {
              bg: "gray.200",
            },
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
