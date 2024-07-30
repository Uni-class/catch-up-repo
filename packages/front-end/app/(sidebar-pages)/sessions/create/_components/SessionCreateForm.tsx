import Button from "@/components/Button";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";
import ModalContainer from "@/components/ModalContainer";
import { Paragraph } from "@/components/Text";
import { CreateSessionDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useMutation } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { ChangeEvent, FormEvent, useRef } from "react";

export default function SessionCreateForm() {
  const formDataRef = useRef<CreateSessionDto>({
    sessionName: "",
    sessionFileIds: [],
  });
  const formMutation = useMutation({
    mutationFn: async (body: CreateSessionDto) =>
      await apiClient.post("/session", body),
  });
  const handleFileButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadAndSelectModal formData={formDataRef} />
        </ModalContainer>
      ),
      { overlayId: "file upload" }
    );
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.sessionName = e.target.value;
  };
  return (
    <form
      className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}
      onSubmit={(e) => {
        e.preventDefault();
        formMutation.mutate(formDataRef.current);
      }}
    >
      <label htmlFor="session title">세션 제목</label>
      <input
        id="session title"
        name="session title"
        placeholder="세션 제목 입력"
        onChange={handleInputChange}
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
  );
}
