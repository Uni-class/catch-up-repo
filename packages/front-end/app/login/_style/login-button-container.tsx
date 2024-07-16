import { styled } from "@/styled-system/jsx";
import Link from "next/link";

export const LoginButtonContainer = styled(Link, {
  base: {
    display: "flex",
    padding: "1.5rem 1rem",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    fontSize: "1.2em",
    fontWeight: "bold",
    borderRadius: "6px",
    boxSizing:"border-box"
  },
  variants: {
    provider: {
      GOOGLE: {
        backgroundColor: "google.base",
        color: "google.base.text",
        _hoverNotActive: {
          backgroundColor: "google.emphasize",
          color: "google.emphasize.text",
        },
        _active: {
          backgroundColor: "google.dark",
          color: "google.dark.text",
        }
      },
      NAVER: {
        backgroundColor: "naver.base",
        color: "naver.base.text",
        _hoverNotActive: {
          backgroundColor: "naver.emphasize",
          color: "naver.emphasize.text",
        },
        _active: {
          backgroundColor: "naver.dark",
          color: "naver.dark.text",
        }
      },
      KAKAO: {
        backgroundColor: "kakao.base",
        color: "kakao.base.text",
        _hoverNotActive: {
          backgroundColor: "kakao.emphasize",
          color: "kakao.emphasize.text",
        },
        _active: {
          backgroundColor: "kakao.dark",
          color: "kakao.dark.text",
        }
      }
    },
  },
});
