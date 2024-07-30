"use client";


import { Heading, Paragraph } from "@/components/Text";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import { overlay } from "overlay-kit";
import ModalContainer from "@/components/ModalContainer";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";


export default function Page() {
  const handleFileButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadAndSelectModal />
        </ModalContainer>
      ),
      { overlayId: "file upload" }
    );
  };
  return (
    <>
      <Heading>세션 생성</Heading>
      <Divider/>
      <form>
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

    </>
  );
}
