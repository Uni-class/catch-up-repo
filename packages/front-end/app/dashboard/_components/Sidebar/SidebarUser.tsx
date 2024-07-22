import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import SidebarUserSwitch from "./SidebarUserSwitch";
import SidebarMenuGroup from "./SidebarMenuGroup";

export default function SidebarUser() {
  return (
    <>
      <SidebarMenuGroup>
        <div className={css({
          padding: "0.8em",
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
              bg: "gray.200",
          },
        })}>
          <p>USER NAME</p>
        </div>
      </SidebarMenuGroup>
      <SidebarMenuGroup>
        <SidebarUserSwitch />
      </SidebarMenuGroup>
    </>
  );
}
