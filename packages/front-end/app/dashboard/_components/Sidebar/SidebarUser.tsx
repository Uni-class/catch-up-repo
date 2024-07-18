import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import SidebarUserSwitch from "./SidebarUserSwitch";

export default function SidebarUser() {

  return (
    <div>
      <Paragraph variant="sub3" className={css({ margin: "8px 0" })}>
        유저
      </Paragraph>
      <div
        className={css({
          display: "flex",
          alignItems: "justify-between",
        })}
      >
        <SidebarUserSwitch />
      </div>
      <div className={css({ padding: "1rem 0" })}>
        <p>유저이름</p>
      </div>
    </div>
  );
}
