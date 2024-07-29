import Button from "@/components/Button";
import { Heading, Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";

export default function HostSession() {
  const handleFileButtonClick = () => {
    overlay.open(({ isOpen, close }) => <></>, { overlayId: "file upload" });
  };
  return (
    <main
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      })}
    >
      <form
        className={css({
          display: "flex",
          flexDirection: "column",
          width: "600px",
          gap: "1rem",
        })}
      >
        <Heading>세션 정보 및 작성</Heading>
        <label htmlFor="session title">세션 제목</label>
        <input
          id="session title"
          name="session title"
          placeholder="세션 제목 입력"
        />
        <label htmlFor="select file">강의 자료 선택</label>
        <Button
          id="select file"
          name="select file"
          type="button"
          onClick={handleFileButtonClick}
        >
          자료 선택
        </Button>
        <label>현재 선택한 파일</label>
        <Paragraph>파일 제목 목록</Paragraph>
        <Button type="submit">세션 시작</Button>
      </form>
    </main>
  );
}
