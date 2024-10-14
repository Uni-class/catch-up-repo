import { css } from "@/styled-system/css";
import { HeaderAccount } from "./HeaderAccuont";

export default function Header() {
  return (
    <header
      className={css({
        height: "4.16rem",
        bg: "white",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "0 2.625rem",
      })}
    >
      <div>
        <p className={css({ fontSize: "1.125rem" })}>
          <span className={css({ fontWeight: "bold", fontSize: "1rem" })}>
            {"Notice. "}
          </span>
          강의 환경 동기화를 위한 솔루션 캐치업
        </p>
      </div>
      <HeaderAccount/>
    </header>
  );
}
