import Switch from "@/components/Switch";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import { ChangeEvent, useState } from "react";

export default function SidebarUserSwitch() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(
    router.query.get("role") === "host"
  );
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRole = router.query.get("role") === "host" ? "participant" : "host";
    router.queryObj["role"] = newRole;
    router.replace(router.getURLString(router.pathname, router.queryObj), {
      scroll: false,
    });
    setIsChecked(e.target.checked);
  };
  return (
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
  );
}
