import Button from "@/components/Button";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";
import { Label } from "@/components/Label";
import LineEdit from "@/components/LineEdit";
import ModalContainer from "@/components/ModalContainer";
import { Paragraph } from "@/components/Text";
import { CreateSessionDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import { apiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { ChangeEvent, FormEvent, useRef } from "react";

export default function SessionCreateForm() {
  const queryClient = useQueryClient();
  const formDataRef = useRef<CreateSessionDto>({
    sessionName: "",
    sessionFileIds: [],
  });
  const formMutation = useMutation({
    mutationFn: async (body: CreateSessionDto) =>
      await apiClient.post("/session", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "sessions", "host"] });
    },
  });
  const handleFileButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadAndSelectModal formDataRef={formDataRef} />
        </ModalContainer>
      ),
      { overlayId: "File-Select" }
    );
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.sessionName = e.target.value;
  };

  return (
    <form
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "800px",
      })}
      onSubmit={(e) => {
        e.preventDefault();
        formMutation.mutate(formDataRef.current);
      }}
    >
      <Label htmlFor="session title">세션 제목</Label>
      <LineEdit
        id="session title"
        name="session title"
        placeholder="세션 제목을 입력해주세요"
        onChange={handleInputChange}
        className={css({ height: "50px" })}
      />
      <Label htmlFor="select file">강의 자료 선택</Label>
      <Button
        id="select file"
        name="select file"
        type="button"
        onClick={handleFileButtonClick}
        className={css({ height: "50px", width: "200px",backgroundColor:"green.600" })}
      >
        자료 선택
      </Button>
      <Label>현재 선택한 파일</Label>
      <Paragraph>선택한 파일이 없습니다.</Paragraph>
      <Button type="submit" className={css({ height: "50px" })}>
        세션 시작
      </Button>
    </form>
  );
}
