import Switch from "@/components/Switch";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { ChangeEvent, useState } from "react";

export default function SidebarUser() {
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
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
        <div
          className={css({
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          })}
        >
          <label htmlFor="role-switch" className={css({ cursor: "pointer" })}>
            수강자
          </label>
          <Switch
            checked={isChecked}
            onChange={handleSwitchChange}
            id="role-switch"
          />
          <label htmlFor="role-switch" className={css({ cursor: "pointer" })}>
            강의자
          </label>
        </div>
      </div>
      <div className={css({padding:"1rem 0"})}>
        <p>유저이름</p>
      </div>
    </div>
  );
}
