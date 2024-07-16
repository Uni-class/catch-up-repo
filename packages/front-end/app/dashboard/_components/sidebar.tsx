import Divider from "@/components/divder";
import Switch from "@/components/switch";
import { css } from "@/styled-system/css";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      className={css({
        height: "100%",
        width: "200px",
        borderRight: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <h2>캐치업</h2>
      <button>세션 접속</button>
      <p>메뉴</p>
      <nav
        className={css({
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        })}
      >
        <Link href="/dashboard">대쉬보드</Link>
        <Link href="/dashboard/session">세션</Link>
        <Link href="/dashboard/drive">드라이브</Link>
      </nav>
      <Divider />
      <div>
        <p>유저</p>
        <Switch
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
        />
        <p>나윤상</p>
      </div>
    </div>
  );
}
