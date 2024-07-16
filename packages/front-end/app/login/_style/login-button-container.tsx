import { styled } from "@/styled-system/jsx";
import Link from "next/link";

export const LoginButtonContainer = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1.5rem",
    width: "100%",
    fontSize: "18px",
    borderRadius: "6px",
    boxSizing:"border-box",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
  },
  variants: {
    provider: {
      GOOGLE: {
        bg: "google.bright",
        color: "google.text",
        border: "1px solid #dedede",
      },
      NAVER: {
        bg: "naver.green",
        color: "#fff",
      },
      KAKAO: {
        bg: "kakao.container",
        color: "kakao.lable",
      }
    },
  },
});
