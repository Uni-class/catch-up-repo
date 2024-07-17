import Switch from "@/components/Switch";
import { css } from "@/styled-system/css";

export default function Sidebar() {
  return (
    <div
      className={css({
        height: "100%",
        width: "200px",
        borderRight: "1px solid",
        borderColor: "gray.200",
      })}
    >
      <h1>캐치업</h1>
      <button>세션 접속</button>
      <p>메뉴</p>
      <nav>
        <ul>
          <li>
            <a href="/dashboard">대쉬보드</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/dashboard/session">세션</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/dashboard/drive">드라이브</a>
          </li>
        </ul>
      </nav>
      <div>
        유저
        <Switch/>
        유저이름
      </div>
    </div>
  );
}
