import { css } from "@/styled-system/css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div
      className={css({
        height: "100%",
        width: "200px",
        borderRight: "1px solid #eee",
        display:"flex",
        flexDirection:"column",
      })}
    >
      <h2>캐치업</h2>
      <button>세션 접속</button>
      <p>메뉴</p>
      <nav className={css({display:"flex",flexDirection:"column",flexGrow:1})}>
        <Link href="/dashboard">대쉬보드</Link>
        <Link href="/dashboard/session">세션</Link>
        <Link href="/dashboard/drive">드라이브</Link>
      </nav>
      <div className={css({borderTop:"1px solid #eee",})}>
        <p>유저</p>
        <p>나윤상</p>
      </div>
    </div>
  );
}
