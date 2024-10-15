import LogoIcon from "@/public/logo-horizontal-white.svg";
import { css } from "@/styled-system/css";

/**
 * 역할에 따라 달라지는 것들
 * - 호스트
 *   - 모드는 내필기 가리기
 *   - 다운로드는 내필기 선택
 * - 참여자
 *   - 모드는 내필기 가리기, 호스트필기 가리기, 자동추적
 *   - 다룬로드는 내필기, 호스트필기 선택
 */
export function Header() {
  return (
    <header
      className={css({
        width: "100%",
        height: "4.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bg:"primary.light",
        padding:"0 2.5rem"
      })}
    >
      <LogoIcon height={"1.352rem"} width={"7.08rem"}/>
      <div>

      </div>
      <div>

      </div>
    </header>
  );
}
