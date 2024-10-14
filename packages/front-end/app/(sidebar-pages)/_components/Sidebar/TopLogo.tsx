"use client";
import { useRouter } from "@/hook/useRouter";
import LogoIcon from "@/public/logo-horizontal-white.svg";
import { css } from "@/styled-system/css";

export function TopLogo() {
  const router = useRouter();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "4.16rem",
      })}
    >
      <div
        className={css({

          cursor: "pointer",
        })}
        onClick={() => {
          router.push("/");
        }}
      >
        <LogoIcon width={"7.08rem"} height={"1.35rem"} />
      </div>
    </div>
  );
}
