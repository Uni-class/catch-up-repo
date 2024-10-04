import Button from "@/components/Button";
import { Heading, Paragraph } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import { ReactNode, useEffect } from "react";

export function CodeOverlayContainer({
  children,
  setShowCodeOverlay,
}: {
  children?: ReactNode;
  setShowCodeOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setShowCodeOverlay(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setShowCodeOverlay]);
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
            setShowCodeOverlay(false);
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
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("링크가 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사에 실패했습니다. 다시 시도해주세요.", err);
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
      <Heading variant="h1">{code}</Heading>
      <Paragraph variant="sub1">또는</Paragraph>
      <Button onClick={()=>{
        const currentURL = router
      }}>링크 복사</Button>
    </div>
  );
}
