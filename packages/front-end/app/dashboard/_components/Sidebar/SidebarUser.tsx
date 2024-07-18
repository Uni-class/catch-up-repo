import Switch from "@/components/Switch";
import { css } from "@/styled-system/css";
import { ChangeEvent, useState } from "react";

export default function SidebarUser() {
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div>
      <p>유저</p>
      <div
        className={css({
          display: "flex",
          alignItems: "justify-between",
        })}
      >
        <label htmlFor="role-switch">수강자</label>
        <Switch
          checked={isChecked}
          onChange={handleSwitchChange}
          id="role-switch"
        />
        <label htmlFor="role-switch">강의자</label>
      </div>

      <p>유저이름</p>
    </div>
  );
}
