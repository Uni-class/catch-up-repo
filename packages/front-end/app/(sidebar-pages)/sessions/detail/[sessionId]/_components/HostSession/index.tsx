import Button from "@/components/Button";
import ModalContainer from "@/components/ModalContainer";
import { Heading, Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import FileUploadModal from "./FileUploadModal";
import { SessionResponseDto } from "@/schema/backend.schema";

interface PropType {
  sessionData: SessionResponseDto;
}

export default function HostSession({ sessionData }: PropType) {
  const handleFileButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadModal />
        </ModalContainer>
      ),
      { overlayId: "file upload" }
    );
  };
  return (
    <main
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        height:"100%",
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
          value={sessionData.sessionName}
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
        {sessionData.fileList.map(
          (file) => (
            <Paragraph key={file.fileId}>{file.name}</Paragraph>
          )
        )}
        <Paragraph>파일 제목 목록</Paragraph>
        <Button type="submit">세션 시작</Button>
      </form>
    </main>
  );
}
