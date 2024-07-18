import Switch from "@/components/Switch";
import { css } from "@/styled-system/css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

function parsingQueryIter(query: IterableIterator<[string, string]>) {
  const queryObj: { [key: string]: string } = {};
  for (const [key, value] of query) {
    queryObj[key] = value;
  }
  return queryObj;
}

function parsingQueryObj(pathname: string, query: { [key: string]: string }) {
  // just construct dummy base url
  const url = new URL(pathname, "http://example.com");
  Object.keys(query).forEach((key) => {
    url.searchParams.append(key, query[key]);
  });
  return `${url.pathname}${url.search}`;
}

export default function SidebarUserSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(
    queryParams.get("role") === "tutor"
  );
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const queryObj = parsingQueryIter(queryParams.entries());
    const newRole = queryParams.get("role") === "tutor" ? "student" : "tutor";
    queryObj["role"] = newRole;
    const href = parsingQueryObj(pathname, queryObj);
    router.replace(href, { scroll: false });
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
