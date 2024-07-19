import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import SidebarUserSwitch from "./SidebarUserSwitch";

export default function SidebarUser() {
  return (
    <div>
      <Paragraph variant="sub3" className={css({ margin: "8px 0" })}>
        역할 전환
      </Paragraph>
      <div
        className={css({
          display: "flex",
          alignItems: "justify-between",
          marginBottom: "3rem",
        })}
      >
        <SidebarUserSwitch />
      </div>
      <Paragraph variant="sub3" className={css({ margin: "8px 0" })}>
        내 정보
      </Paragraph>
      <div
        className={css({
          padding: "1rem 0.5rem",
          borderRadius: "8px",
          cursor:"pointer",
          "&:hover": {
            bg: "gray.200",
          },
        })}
      >
        <p>아이콘, 유저이름</p>
      </div>
    </div>
  );
}
