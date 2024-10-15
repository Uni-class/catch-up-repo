import Button from "@/components/Button";
import { Heading, Paragraph } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import Image from "next/image";
import { overlay } from "overlay-kit";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

export function CodeOverlayContainer({
  children,

}: {
  children?: ReactNode;

}) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        overlay.unmount("code-overlay");
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  return (
    <div
      className={css({
        position: "absolute",
        zIndex: 1000,
        top: 0,
        left: 0,
        backgroundColor: "#FFFFFFF5",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "2.5rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <Paragraph variant="body2">참여 정보를 공유하세요</Paragraph>
        <button
          className={css({ cursor: "pointer" })}
          onClick={() => {
            overlay.unmount("code-overlay");
          }}
        >
          <Paragraph variant="body2">닫기 X</Paragraph>
        </button>
      </div>
      <div
        className={css({
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export function CodeOverlay({ code }: { code: string }) {
  const router = useRouter();
  const copyToClipboard = (text: string, prefix: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast(`${prefix}가 클립보드에 복사되었습니다!`, {
          position: "bottom-left",
        });
      })
      .catch((err) => {
        toast("복사에 실패했습니다. 다시 시도해주세요.", {
          position: "bottom-left",
        });
      });
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      })}
    >
      <Paragraph variant="sub1">세션 코드</Paragraph>
      <h1
        onClick={() => {
          copyToClipboard(code, "코드");
        }}
        className={css({
          cursor:"pointer",
          transition: "opacity 0.3s ease",
          fontSize: "10rem",
          fontWeight:"bold",
          "&:hover":{
            opacity:0.7,
          }
        })}
      >
        {code}
        <span>
          <Image
            alt="link"
            src="/icons/copy.svg"
            width={10}
            height={10}
            className={css({
              width: "1em",
              height: "1em",
              color: "#fff",
              display: "inline",
              marginLeft: "0.25em",
            })}
          />
        </span>
      </h1>
      <Paragraph variant="sub1">또는</Paragraph>
      <Button
        onClick={() => {
          const currentURL = router.getCurrentURL();
          copyToClipboard(currentURL, "링크");
        }}
      >
        링크 복사
      </Button>
    </div>
  );
}
