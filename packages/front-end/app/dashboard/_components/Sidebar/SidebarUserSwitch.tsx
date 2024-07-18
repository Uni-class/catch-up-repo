import Switch from "@/components/Switch";
import { css } from "@/styled-system/css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

function parsingQuery(query:IterableIterator<[string, string]>){
    for (const [key, value] of query) {
        console.log(`${key}, ${value}`);
      }
}

export default function SidebarUserSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams().entries();
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(pathname,queryParams);
    router.replace("",{scroll:false})
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
